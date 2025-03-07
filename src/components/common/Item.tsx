import React from "react"

import Badge from "@mui/material/Badge"
import type { SxProps } from "@mui/system"
import { styled } from "@mui/system"
import Image from "next/image"
import { serialize as serializeUri } from "uri-js"

import { publicRuntimeConfig } from "@/configurations/runtimeConfig"

interface ItemProps {
  itemId: number | string
  count?: number | string
  sx?: SxProps
}

enum ItemBackend {
  NOT_INITIALIZED = 0,
  SPRITE = 1,
  STATIC = 2
}

interface ItemState {
  col: number
  cols: number
  itemBackend: ItemBackend
  row: number
  rows: number
}

const Sprite = styled("div")({
  backgroundImage: "url(\"" + serializeUri({
    ...publicRuntimeConfig.THERESA_STATIC,
    path: "/api/v0/AK/CN/Android/item/sprite"
  }) + "\")",
  height: "100%",
  width: "100%"
})

interface SpriteData {
  cols: number
  itemIds: readonly string[]
  rows: number
}

const spriteDataMap = new Map<string, Promise<SpriteData>>()

class Item extends React.PureComponent<ItemProps, ItemState> {
  private static readonly defaultProps = {
    count: null,
    sx: null
  }

  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
  public constructor (props: Readonly<ItemProps>) {
    super(props)
    this.state = {
      col: 0,
      cols: 0,
      itemBackend: ItemBackend.NOT_INITIALIZED,
      row: 0,
      rows: 0
    }
  }

  public async componentDidMount (): Promise<void> {
    const { itemId } = this.props
    const spriteUri = serializeUri({
      ...publicRuntimeConfig.THERESA_STATIC,
      path: "/api/v0/AK/CN/Android/item/sprite"
    })
    let spriteData
    spriteData = spriteDataMap.get(spriteUri)
    if (!spriteData) {
      spriteData = fetch(spriteUri).then((response): SpriteData => {
        const _spriteData = {
          cols: parseInt(response.headers.get("X-Cols") ?? ""),
          itemIds: JSON.parse(response.headers.get("X-Item-Ids") ?? "") as string[],
          rows: parseInt(response.headers.get("X-Rows") ?? "")
        } as SpriteData
        return _spriteData
      })
      spriteDataMap.set(spriteUri, spriteData)
    }
    await spriteData.then((data) => {
      const index = data.itemIds.indexOf(itemId.toString())
      const notFound = -1
      if (index !== notFound) {
        this.setState({
          col: index % data.cols,
          cols: data.cols,
          itemBackend: ItemBackend.SPRITE,
          row: Math.floor(index / data.cols),
          rows: data.rows
        })
      } else {
        this.setState({
          itemBackend: ItemBackend.STATIC
        })
      }
    })
  }

  public render (): React.ReactNode {
    const { itemId, count, sx } = this.props
    const { itemBackend, col, cols, row, rows } = this.state
    const indexOffset = 1

    return (
      <Badge
        anchorOrigin={{
          horizontal: "right",
          vertical: "bottom"
        }}
        badgeContent={count}
        color="info"
        overlap="circular"
        sx={sx}
      >
        <div style={{
          aspectRatio: "1/1",
          display: "flex",
          height: "4rem",
          position: "relative",
          width: "4rem"
        }}
        >
          {itemBackend === ItemBackend.SPRITE &&
          <Sprite
            sx={{
              backgroundPosition: `calc(100% / ${cols - indexOffset} * ${col}) calc(100% / ${rows - indexOffset} * ${row})`,
              backgroundSize: `calc(100% * ${cols})`
            }}
          />}

          {itemBackend === ItemBackend.STATIC &&
          <Image
            alt={`Item ${itemId}`}
            fill
            src={serializeUri({
              ...publicRuntimeConfig.THERESA_STATIC,
              path: `/api/v0/AK/CN/Android/item/id/${itemId}`
            })}
            unoptimized
          />}
        </div>
      </Badge>
    )
  }
}

export default Item
