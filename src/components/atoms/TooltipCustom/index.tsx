import { Tooltip, TooltipProps, Typography } from '@mui/material'
import { ReactNode } from 'react'
import _ from 'lodash'

type Props = Omit<TooltipProps, 'children'> & {
  maxLength?: number
  children: ReactNode
}

export const TooltipCustom = ({ maxLength, children, ...props }: Props) => {
  let childValue: any
  if (_.isString(children) && maxLength && children.length > maxLength) {
    childValue = children.slice(0, maxLength)
  } else childValue = children

  return (
    <Tooltip {...props}>
      <Typography
        style={{
          color: 'black',
        }}
      >
        {childValue}
      </Typography>
    </Tooltip>
  )
}
