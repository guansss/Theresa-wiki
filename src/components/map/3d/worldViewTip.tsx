import React from "react"

import { styled } from "@mui/system"
import { sample } from "lodash"

import { tipTable } from "@/models/gamedata/excel/tipTable"

const WorldViewTipDiv = styled("div")({
  backgroundColor: "#424242",
  display: "inline-flex",
  height: "calc(30% - 4px - 36.5px)",
  position: "relative",
  top: "70%",
  width: "100%"
})

const WorldViewTipTitle = styled("div")({
  color: "#fff",
  margin: "auto",
  textAlign: "center",
  width: "20%"
})

const WorldViewTipDescription = styled("div")({
  color: "#fff",
  fontSize: "x-small",
  margin: "auto 1em",
  overflow: "hidden",
  textAlign: "center",
  width: "80%"
})

class WorldViewTip extends React.PureComponent {
  public render (): React.ReactNode {
    const worldViewTipSample = sample(tipTable.worldViewTips)

    return (
      <WorldViewTipDiv>
        <WorldViewTipTitle>
          {worldViewTipSample?.title}
        </WorldViewTipTitle>

        <WorldViewTipDescription>
          {worldViewTipSample?.description}
        </WorldViewTipDescription>
      </WorldViewTipDiv>
    )
  }
}

export default WorldViewTip
