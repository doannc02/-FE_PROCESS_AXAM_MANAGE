import { IconButton } from '@mui/material'
import Image from 'next/image'

export const RemoveIcon = ({ handleClick }: { handleClick: () => void }) => {
  return (
    <IconButton onClick={handleClick}>
      <Image
        src={require('@/assets/svg/minusCircle.svg')}
        alt=''
        width={16}
        height={16}
      />
    </IconButton>
  )
}
