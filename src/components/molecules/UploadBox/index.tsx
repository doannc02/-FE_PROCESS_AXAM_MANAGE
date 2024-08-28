import DeleteIcon from '@/assets/svg/action/delete.svg'
import EditIcon from '@/assets/svg/action/edit.svg'
import { commonApi } from '@/config/axios'
import { errorMsg } from '@/helper/message'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { Box, IconButton, Typography } from '@mui/material'
import Image from 'next/image'
import { ChangeEvent, useRef, useState } from 'react'
import LoadingPage from '../../atoms/LoadingPage'
import { common } from '@mui/material/colors'

export const fileUpload = (data: any) => {
  return commonApi({
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    url: '/api/v1/file-upload',
    data,
    params: { feature_alias: 'upload-product' },
  })
}

interface Props {
  textUpload?: string
  url?: string
  setUrl: (val: string | null) => void
}

const UploadBox = (props: Props) => {
  const { url, setUrl, textUpload = 'Upload' } = props
  const [loading, setLoading] = useState(false)

  const refElement = useRef<HTMLInputElement>(null)

  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target?.files
    setLoading(true)
    if (selectedFiles && selectedFiles[0]?.size > 5242880) {
      errorMsg('File vượt quá 5MB')
      event.stopPropagation()
      setLoading(false)
    }
    if (selectedFiles?.length && selectedFiles?.length > 0) {
      try {
        const formData = new FormData()
        formData.append('file', selectedFiles[0])
        const res = await fileUpload(formData)
        setUrl(res?.data?.data?.url)
        setLoading(false)
      } catch (e) {
        setLoading(false)
        errorMsg(e)
      }
    }
  }

  return (
    <Box
      sx={{
        border: '1px dashed #DFE0EB',
        height: '100px',
        width: '100px',
        borderRadius: '4px',
        position: 'relative',
      }}
    >
      {loading ? (
        <LoadingPage />
      ) : (
        <>
          {url ? (
            <Image src={url} alt='' width={100} height={100} />
          ) : (
            <Box className='flex flex-col items-center mt-10'>
              <CloudUploadIcon />
              <Typography variant='body1'>{textUpload}</Typography>
            </Box>
          )}
          <input
            className='hidden'
            type='file'
            accept='image/png, image/jpeg, image/jpg'
            onChange={handleFileUpload}
            multiple
            ref={refElement}
          />

          <IconButton
            style={{
              position: 'absolute',
              bottom: '8px',
              left: '8px',
              backgroundColor: url ? '#DFE0EB' : undefined,
            }}
            onClick={() => {
              if (refElement && refElement.current) refElement.current.click()
            }}
          >
            <Image src={EditIcon} alt='' width={16} height={16} />
          </IconButton>
          <IconButton
            style={{
              position: 'absolute',
              bottom: '8px',
              right: '8px',
              backgroundColor: url ? '#DFE0EB' : undefined,
            }}
            onClick={() => setUrl(null)}
          >
            <Image src={DeleteIcon} alt='' width={16} height={16} />
          </IconButton>
        </>
      )}
    </Box>
  )
}

export default UploadBox
