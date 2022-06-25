import React from "react"

import { SvgIcon } from "@mui/material"

import type { IconProps } from "../common"
import { defaultIconProps } from "../common"

export default class BattleIcon extends React.PureComponent<IconProps> {
  private static readonly defaultProps = defaultIconProps

  public render (): React.ReactNode {
    const { sx } = this.props
    return (
      <SvgIcon
        sx={sx}
        viewBox="0 0 128 128"
      >
        <path d="M48,37l-9-6L64,6,89,31l-9,6L64,22ZM89,72H84v5L70,64,86,48l4-2,8-15L82,39l-2,4L64,58,48,43l-2-4L30,31c1,3,8,15,8,15l4,2L58,64,44,77V72H39V84l-9,9,4,4,9-9H56V83H50c5-4.33,14-13,14-13L77,83H72v5H85l9,9,4-4-9-9ZM36,83V79L22,64,36,49,30,39,6,64,30,88ZM98,39,92,49l14,15L92,79v4l6,5.5,24-24ZM79,92,64,107,49,92H44l-5,5,25,25L89,97l-5-5Z" />
      </SvgIcon>
    )
  }
}
