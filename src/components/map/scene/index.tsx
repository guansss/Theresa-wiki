import React from "react"

import { grey } from "@mui/material/colors"
import Grid from "@mui/material/Grid"
import { styled } from "@mui/system"

import type { IMapData, IMapDataTiles } from "@/models/gamedata/levels/index"

import Tile from "./tile"

interface IMapSceneProps {
  mapData: IMapData
  onTileClick?: (
    // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
    event: Readonly<React.MouseEvent<HTMLDivElement>>,
    tile: Readonly<IMapDataTiles>,
    index: number,
    width: number,
    height: number
  ) => void
}

const MapSceneContainer = styled("div")({
  aspectRatio: "16 / 9",
  display: "flex",
  margin: "auto",
  overflow: "hidden",
  position: "relative",
  width: "auto"
})

class MapScene extends React.PureComponent<IMapSceneProps> {
  private static readonly defaultProps = {
    onTileClick: undefined
  }

  public render (): React.ReactNode {
    const { mapData, onTileClick } = this.props
    const { tiles, width, height } = mapData

    return (
      <MapSceneContainer>
        <Grid
          columns={width}
          container
          sx={{
            backgroundColor: theme => theme.palette.mode === "light" ? grey[100] : grey[900],
            display: "flex",
            flexWrap: "wrap-reverse",
            margin: "auto",
            width: `min(95%, 95% * 9 / 16 * ${width} / ${height})`
          }}
        >
          {tiles.map((tile: Readonly<IMapDataTiles>, index) => {
            return (
              <Grid
                item
                key={`${tile.tileKey}-${index % width}-${Math.floor(index / width)}`}
                onClick={(event): void => {
                  if (onTileClick) {
                    onTileClick(event, tile, index, width, height)
                  }
                }}
                xs={1}
              >
                <Tile
                  tile={tile}
                />
              </Grid>
            )
          })}
        </Grid>
      </MapSceneContainer>
    )
  }
}

export default MapScene
