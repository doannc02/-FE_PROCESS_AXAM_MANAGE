import { GREY } from '@/helper/colors'
import {
  Box,
  Divider,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material'
import Image from 'next/image'
import { useRef } from 'react'

type Props = {
  handleSaveFile: (e: React.ChangeEvent<HTMLInputElement>) => void
  label: string
  file?: File
}

export const CoreInputFile = (props: Props) => {
  const { handleSaveFile, label, file } = props

  const ref: any = useRef(null)

  return (
    <Box className='my-10 w-full'>
      <TextField
        variant='standard'
        className='w-full'
        value={file?.name ?? ''}
        placeholder='Chưa có file nào được chọn'
        label={label}
        onClick={() => ref.current.click()}
        InputProps={{
          style: { padding: 0 },
          readOnly: true,
          endAdornment: (
            <InputAdornment position='end'>
              <Box className='flex items-center justify-center mx-3 cursor-pointer'>
                <Divider orientation='vertical' flexItem />
                <Typography
                  sx={{
                    color: '#747475',
                    marginRight: '5px',
                    marginLeft: '10px',
                  }}
                  // variant='body2'
                >
                  Choose file
                </Typography>
                <input
                  hidden
                  type='file'
                  accept={'.xlsx'}
                  onChange={(e) => {
                    handleSaveFile(e)
                  }}
                  className='absolute w-[100px] top-0 h-full opacity-0 cursor-pointer right-6'
                  ref={ref}
                />
                <Image
                  src={require('@/assets/svg/uploadSimpleGrayIcon.svg')}
                  alt='export'
                  width={15}
                  height={15}
                  color={GREY}
                />
              </Box>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  )
}
