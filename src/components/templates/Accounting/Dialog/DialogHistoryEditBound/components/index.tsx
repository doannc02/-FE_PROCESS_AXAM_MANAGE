import { MENU_URL } from '@/routes'
import { Typography } from '@mui/material'

export const ViewDetail = ({ onClick }: {  onClick : () => void }) => {
  
  return (
    <div
      onClick={onClick}
    >
      <Typography color='blue'>Xem chi tiết</Typography>
    </div>
  )
}
