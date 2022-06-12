import React from "react"

import Divider from "@mui/material/Divider"

import StyledLink from "@/components/common/styledLink"

import type { ICustomStageInfo, IUnlockCondition } from "@/models/gamedata/excel/stageTable"

import style from "./stageInfoTable.module.scss"

interface StageInfoTableProps {
  stageInfo: ICustomStageInfo
}

export default class UnlockConditionRow extends React.PureComponent<StageInfoTableProps> {
  public render (): React.ReactNode {
    const { stageInfo } = this.props

    return (
      <>
        <span style={{ margin: "auto", minWidth: "6em", textAlign: "center", width: "25%" }} >
          解锁条件
        </span>

        <Divider
          flexItem
          orientation="vertical"
          variant="middle"
        />

        <span style={{ width: "75%" }} >
          {stageInfo.unlockCondition.map((unlockCondition: Readonly<IUnlockCondition>) => {
            const extraStageInfo = stageInfo._unlockConditionStageInfo[unlockCondition.stageId]
            const noStars = 3
            return (
              <div
                className={style["unlock-condition-row"]}
                key={unlockCondition.stageId}
              >
                {
                  [...Array(noStars).keys()].map((value, index) => {
                    if (index < unlockCondition.completeState) {
                      return (
                        <span
                          className={style["mission-star"]}
                          key={value}
                        />
                      )
                    } else {
                      return (
                        <span
                          className={style["mission-star-grey"]}
                          key={value}
                        />
                      )
                    }
                  })
                }

                <StyledLink
                  href={{
                    pathname: "/map/[zoneId]/[stageId]",
                    query: {
                      stageId: extraStageInfo.stageId,
                      zoneId: extraStageInfo.zoneId
                    }
                  }}
                  sx={{ cursor: "pointer", marginLeft: "0.5em" }}
                  underline="hover"
                >
                  {`${extraStageInfo.code} ${extraStageInfo.name}`}
                </StyledLink>
              </div>
            )
          })}
        </span>
      </>
    )
  }
}
