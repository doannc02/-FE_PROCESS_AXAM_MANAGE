import LoadingPage from '@/components/atoms/LoadingPage'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import Typography from '@mui/material/Typography'
import { ChangeEvent } from 'react'

type UploadFileProps = {
  handleFileUpload: (event: ChangeEvent<HTMLInputElement>) => void
  loading?: boolean
  disabled?: boolean
  helperText?: string
}

export const UploadFileCustom: React.FC<UploadFileProps> = ({
  handleFileUpload,
  loading,
  disabled,
  helperText,
}) => {
  return (
    <div className='flex flex-col justify-between gap-1'>
      <Typography variant='body1'>Tệp đính kèm</Typography>
      <label className='flex flex-wrap flex-col gap-3 items-center justify-center py-[80px]  border border-solid border-[#DFE0EB]  rounded-md cursor-pointer '>
        {loading ? (
          <LoadingPage />
        ) : (
          <div className='flex flex-col items-center justify-center'>
            <CloudUploadIcon />
            <Typography>Upload</Typography>
            <input
              className='hidden'
              type='file'
              accept='image/png, image/jpeg, image/jpg'
              onChange={handleFileUpload}
              multiple
              disabled={disabled}
            />
          </div>
        )}
      </label>
      {helperText && <Typography variant='body2'>{helperText}</Typography>}
    </div>
  )
}
