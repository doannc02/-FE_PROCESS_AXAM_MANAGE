import { commonApi } from '@/config/axios'
import { errorMsg } from '@/helper/message'

import { Box, CircularProgress, TextField, TextFieldProps } from '@mui/material'
import Image from 'next/image'
import { forwardRef, useRef, useState } from 'react'
import { Control, Controller } from 'react-hook-form'

export const fileUpload = (data: any, params: any = {}) => {
  return  commonApi({
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    url: '/api/v1/file-upload',
    data,
    params,
  })
}

export const TextFieldUploadCustom = forwardRef<
  HTMLInputElement,
  TextFieldProps & { name: string; control: Control<any> }
>(function TextboxBase({ control, name, ...props }, ref) {
  const refElement = useRef<HTMLInputElement>(null)

  const [isLoading, setIsLoading] = useState(false)

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          ref={ref}
          value={field.value}
          fullWidth
          margin='none'
          InputProps={{
            ...props.InputProps,
            style: { height: 46, cursor: 'pointer' },
            readOnly: true,
            endAdornment: (
              <Box
                sx={{
                  height: '46px',
                  minWidth: '90px',
                  border: 'none',
                  borderRadius: 0,
                  borderLeft: '1px solid #DFE0EB',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '10px 13px',
                  zIndex: 1,
                }}
              >
                {isLoading ? (
                  <CircularProgress size='1.5rem' />
                ) : (
                  <>
                    <Image
                      src={require('@/assets/svg/uploadSimple.svg')}
                      height={20}
                      width={20}
                      alt='upload'
                    />
                    <span className='pl-3 pt-2 text-sm text-[#747475]'>
                      Upload
                    </span>
                    <input
                      hidden
                      type='file'
                      ref={refElement}
                      accept='image/png, image/jpeg, image/jpg'
                      onChange={async (e) => {
                        setIsLoading(true)
                        const selectedFiles = e.target.files
                        if (
                          selectedFiles?.length &&
                          selectedFiles?.length > 0
                        ) {
                          try {
                            const formData = new FormData()
                            formData.append('file', selectedFiles[0])
                            formData.append('feature_alias', 'feature-code')
                            const res = await fileUpload(formData)
                            field.onChange(res?.data?.data?.url)
                            setIsLoading(false)
                          } catch (e) {
                            errorMsg(e)
                          }
                        }
                      }}
                    />
                  </>
                )}
              </Box>
            ),
            required: false,
          }}
          onClick={() => {
            if (refElement.current) {
              refElement.current.click()
            }
          }}
          {...props}
        />
      )}
    />
  )
})
