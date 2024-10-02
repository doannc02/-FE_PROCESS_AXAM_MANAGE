import DeleteIcon from '@/assets/svg/action/delete.svg'
import EditIcon from '@/assets/svg/action/edit.svg'
import ViewIcon from '@/assets/svg/Eye.svg'
import { commonApi } from '@/config/axios'
import { errorMsg } from '@/helper/message'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { Box, Checkbox, IconButton, Stack, Typography } from '@mui/material'
import Image from 'next/image'
import { ChangeEvent, useRef, useState } from 'react'
import LoadingPage from '../../atoms/LoadingPage'
import { common } from '@mui/material/colors'
import { debounce } from 'lodash'
import { CheckBox } from '@mui/icons-material'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import DialogViewFile from './components/DialogViewFile'

export const fileUpload = (data: any) => {
  return commonApi({
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    url: '/api/v1/upload-file',
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
  const [url_res, setUrlRes] = useState('')
  const refElement = useRef<HTMLInputElement>(null)
  const { hideDialog, showDialog } = useDialog()
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
        setUrl(res?.data)
        setUrlRes(res?.data)
        setLoading(false)
      } catch (e) {
        setLoading(false)
        errorMsg(e)
      }
    }
  }
  console.log(url, 'kicm')
  return (
    <Stack
      direction={'row-reverse'}
      justifyContent={'center'}
      alignItems={'center'}
    >
      {url_res && (
        <div className='ml-30'>
          {' '}
          Name file: ...
          {url_res.toString().slice(68, url_res.toString().length)}
        </div>
      )}
      <Box
        sx={{
          border: '1px dashed #DFE0EB',
          height: '90px',
          width: '150px',
          borderRadius: '4px',
          position: 'relative',
          marginLeft: '40px',
        }}
      >
        {loading ? (
          <LoadingPage />
        ) : (
          <>
            {url_res ? (
              <>
                success upload
                <Checkbox checked readOnly />
              </>
            ) : (
              <Box className='flex flex-col items-center mt-10'>
                <CloudUploadIcon />
                <Typography variant='body1'>{textUpload}</Typography>
              </Box>
            )}
            <input
              className='hidden'
              type='file'
              accept='.pdf,.doc,.docx'
              onChange={debounce(handleFileUpload, 2000)}
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

            {url_res && (
              <IconButton
                style={{
                  position: 'absolute',
                  bottom: '8px',
                  right: '65px',
                  backgroundColor: url ? '#DFE0EB' : undefined,
                }}
                onClick={() => {
                  showDialog(
                    <DialogViewFile
                      src={url_res}
                      nameFile={url_res.slice(68, url_res?.length)}
                    />
                  )
                }}
              >
                <Image src={ViewIcon} alt='' width={16} height={16} />
              </IconButton>
            )}

            <IconButton
              style={{
                position: 'absolute',
                bottom: '8px',
                right: '8px',
                backgroundColor: url ? '#DFE0EB' : undefined,
              }}
              onClick={() => {
                setUrlRes('')
                setUrl(null)
              }}
            >
              <Image src={DeleteIcon} alt='' width={16} height={16} />
            </IconButton>
          </>
        )}
      </Box>
    </Stack>
  )
}

export default UploadBox
