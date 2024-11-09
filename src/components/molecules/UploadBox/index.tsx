import DeleteIcon from '@/assets/svg/action/delete.svg'
import EditIcon from '@/assets/svg/action/edit.svg'
import ImportIcon from '@/assets/svg/action/import.svg'
import ViewIcon from '@/assets/svg/Eye.svg'
import { commonApi } from '@/config/axios'
import { errorMsg } from '@/helper/message'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import Link from 'next/link'
import {
  Box,
  Checkbox,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import Image from 'next/image'
import { ChangeEvent, useRef, useState } from 'react'
import LoadingPage from '../../atoms/LoadingPage'
import { common } from '@mui/material/colors'
import { debounce, method } from 'lodash'
import { CheckBox } from '@mui/icons-material'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import DialogViewFile from './components/DialogViewFile'
import { Controller, useFormContext } from 'react-hook-form'
import { useRouter } from 'next/router'
import { BLUE } from '@/helper/colors'

const downloadFile = async (fileName: string) => {
  if (!fileName) {
    console.error('Failed to download file')
    return
  }

  const a = document.createElement('a') // Tạo phần tử a để tải xuống
  a.href = fileName
  a.download = fileName // Tên tệp tải xuống
  document.body.appendChild(a) // Thêm vào DOM
  a.click() // Thực hiện tải xuống
  a.remove() // Xóa phần tử a khỏi DOM
  window.URL.revokeObjectURL(fileName) // Giải phóng URL blob
}

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
  isView?: boolean
  textUpload?: string
  url?: string
  setUrl: (val: string | null) => void
  name: string
}

const UploadBox = (props: Props) => {
  const { url, setUrl, textUpload = 'Upload', isView, name } = props
  const [loading, setLoading] = useState(false)
  const [url_res, setUrlRes] = useState(url)
  const refElement = useRef<HTMLInputElement>(null)
  const { showDialog } = useDialog()
  const methodForm = useFormContext<any>()
  const { control } = methodForm

  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target?.files
    console.log(selectedFiles, 'l;')
    setLoading(true)
    if (selectedFiles && selectedFiles[0]?.size > 5242880) {
      errorMsg('File vượt quá 5MB')
      event.stopPropagation()
      setLoading(false)
    }
    if (selectedFiles && selectedFiles[0]?.size < 5242880) {
      try {
        const formData = new FormData()
        formData.append('file', selectedFiles[0])
        console.log('llll')
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

  return (
    <>
      {/* ['docx', 'pdf'].some((find) => (url_res ?? '').includes(find)) */}
      {true ? (
        <Stack
          direction={'row-reverse'}
          justifyContent={'start'}
          alignItems={'center'}
        >
          {url_res && (
            <IconButton
              sx={{
                marginLeft: '40px',
              }}
              onClick={() => {
                // router.push(url_res)
              }}
            >
              <Typography fontWeight={500} color={BLUE}>
                <Link href={url_res} legacyBehavior>
                  <a target='_blank' rel='noopener noreferrer'>
                    Name file: 
                    {url_res.toString().length > 70
                      ? url_res.toString().slice(66, url_res.toString().length)
                      : url_res.toString().slice(10, url_res.toString().length)}
                  </a>
                </Link>
              </Typography>
            </IconButton>
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
                <Box className='flex flex-col items-center mt-10'>
                  {!url_res ? (
                    <CloudUploadIcon />
                  ) : (
                    <div className='h-10'></div>
                  )}
                  <Typography variant='body1'>{textUpload}</Typography>
                </Box>

                <Controller
                  name={name}
                  control={control}
                  rules={{
                    required: 'Vui lòng chọn tệp đính kèm.',
                  }}
                  render={({ field, fieldState: { error } }) => {
                    console.log(error, refElement, 'zzz')
                    return (
                      <>
                        {!isView && (
                          <IconButton
                            style={{
                              position: 'absolute',
                              top: '8px',
                              left: '8px',
                              backgroundColor: url ? '#DFE0EB' : undefined,
                            }}
                            onClick={() => {
                              if (refElement && refElement.current)
                                refElement.current.click()
                            }}
                          >
                            <Image
                              src={EditIcon}
                              alt=''
                              width={16}
                              height={16}
                            />
                          </IconButton>
                        )}
                        {url_res && (
                          <IconButton
                            style={{
                              position: 'absolute',
                              top: '8px',
                              right: '65px',
                              backgroundColor: url ? '#DFE0EB' : undefined,
                            }}
                            onClick={() => {
                              showDialog(
                                <DialogViewFile
                                  src={url_res}
                                  nameFile={url_res.slice(48, url_res?.length)}
                                />
                              )
                            }}
                          >
                            <Image
                              src={ViewIcon}
                              alt=''
                              width={16}
                              height={16}
                            />
                          </IconButton>
                        )}
                        {url_res?.includes('doc') && (
                          <IconButton
                            style={{
                              position: 'absolute',
                              top: '8px',
                              right: '65px',
                              backgroundColor: url ? '#DFE0EB' : undefined,
                            }}
                            onClick={() => {
                              downloadFile(url_res)
                            }}
                          >
                            <Image
                              src={ImportIcon}
                              alt=''
                              width={16}
                              height={16}
                            />
                          </IconButton>
                        )}
                        {!isView && (
                          <IconButton
                            style={{
                              position: 'absolute',
                              top: '8px',
                              right: '8px',
                              backgroundColor: url ? '#DFE0EB' : undefined,
                            }}
                            onClick={() => {
                              field.onChange(undefined)
                              setUrlRes('')
                              setUrl(null)
                            }}
                          >
                            <Image
                              src={DeleteIcon}
                              alt=''
                              width={16}
                              height={16}
                            />
                          </IconButton>
                        )}
                        <input
                          className='hidden'
                          type='file'
                          accept='.pdf,.doc,.docx'
                          onChange={(e) => {
                            const files = e.target.files

                            field.onChange(files)
                            handleFileUpload(e) // Hàm xử lý file do bạn viết
                          }}
                          multiple
                          ref={refElement}
                        />
                        {error && !!refElement?.current && (
                          <span className='text-red-500 mt-10'>
                            {error?.message}
                          </span>
                        )}
                      </>
                    )
                  }}
                />
              </>
            )}
          </Box>
        </Stack>
      ) : null}
    </>
  )
}

export default UploadBox
