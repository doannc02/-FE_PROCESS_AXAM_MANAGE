import { BLACK } from '@/helper/colors'
import { Box, Tooltip } from '@mui/material'

export const TruncatedText = (props : {text: string}) => {
    const { text} = props
  const truncated = text && text.length > 30 ? text.slice(0, 30) : text
  return text && text.length > 30 ? (
    <Tooltip title={<div style={{ color: BLACK }}>{text ?? ''}</div>} arrow>
      <Box>{truncated ?? ''}...</Box>
    </Tooltip>
  ) : (
    <Box>{text}</Box>
  )
}
