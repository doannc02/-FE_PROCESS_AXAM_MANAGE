import { BLACK, BLUE, GREEN, ORANGE } from '@/helper/colors'
import { Typography } from '@mui/material'

const DisplayStatus = ({ text, color }: { text: string; color?: string }) => {
  return <Typography color={color ?? BLACK}>{text}</Typography>
}
export default DisplayStatus
