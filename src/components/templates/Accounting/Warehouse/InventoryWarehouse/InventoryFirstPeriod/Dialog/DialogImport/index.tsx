import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import { CoreButton } from '@/components/atoms/CoreButton'
import CoreInput from '@/components/atoms/CoreInput'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import { DialogCustom } from '@/components/organism/DialogCustom'
import { GREEN, PRIMARY, RED } from '@/helper/colors'
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined'
import { Box, CircularProgress, TextField, Typography } from '@mui/material'
import { toInteger } from 'lodash'
import Image from 'next/image'
import { useRef } from 'react'
import { useDialogImport } from './useDialogImport'
import { CoreTable } from '@/components/organism/CoreTable'

export type Props = {
  refetch: any
}

const DialogImport = (props: Props) => {
  const refElement = useRef<HTMLInputElement>(null)

  const [values, handles] = useDialogImport(props)
  const {
    methodForm,
    file,
    sheets,
    isLoading,
    dataRows,
    dataRowsTable,
    columns,
    isStepTwo,
    errorLineNumber,
    chunkDataRows,
    queryPage,
    isLoadingInsertData,
  } = values

  const {
    handleChangeFile,
    handleDownloadTemplate,
    onSubmit,
    handleInsertData,
    handleDownloadFileErrors,
    onChangePageSize,
  } = handles

  const { control } = methodForm
  const { hideDialog } = useDialog()
  return (
    <DialogCustom
      title={<Typography variant='h5'>Import</Typography>}
      onClose={hideDialog}
      formProps={{ onSubmit }}
      width={isStepTwo ? 1080 : 600}
    >
      {!isStepTwo ? (
        <>
          <div className='px-10 py-15'>
            <TextField
              value={file?.name ?? ''}
              fullWidth
              label='Upload file'
              placeholder='Chưa có file nào được chọn'
              margin='none'
              // className='mb-15'
              InputProps={{
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
                          accept='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                          onChange={handleChangeFile}
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
            />

            <Box
              className='flex items-center mt-10 space-x-4 cursor-pointer mb-15'
              onClick={handleDownloadTemplate}
            >
              <Image
                src={require('@/assets/svg/DownloadSimple.svg')}
                height={20}
                width={20}
                alt='download'
              />
              <Typography variant='body1' sx={{ color: GREEN }}>
                Download mẫu
              </Typography>
            </Box>

            <CoreAutocomplete
              control={control}
              name='sheet'
              label='Sheet chứa dữ liệu'
              options={sheets}
              className='mb-15'
              returnValueType='option'
              disabled={!file}
            />

            <CoreInput
              control={control}
              name='lineNumber'
              label='Dòng tiêu đề lấy từ dòng'
              placeholder='Nhập dòng tiêu đề lấy từ dòng'
              className='mb-15'
            />
          </div>
          <div className='flex items-center justify-center w-full space-x-10 mb-13'>
            <CoreButton theme='cancel' onClick={hideDialog}>
              Hủy
            </CoreButton>

            <CoreButton theme='submit' type='submit' loading={isLoading}>
              Tiếp tục
            </CoreButton>
          </div>
        </>
      ) : (
        <div className='px-10 py-15'>
          <Typography variant='body1' sx={{ color: GREEN }} className='mb-6'>
            {dataRows.length - errorLineNumber}/{dataRows.length} dòng dữ liệu
            nhập hợp lệ
          </Typography>
          <Box className='flex items-center mb-6 space-x-4'>
            <Typography variant='body1' sx={{ color: RED }}>
              {errorLineNumber}/{dataRows.length} dòng dữ liệu nhập không hợp lệ
            </Typography>
            <Typography
              variant='body1'
              sx={{ color: PRIMARY }}
              className='flex items-center space-x-3 cursor-pointer'
              onClick={handleDownloadFileErrors}
            >
              <FileDownloadOutlinedIcon />
              Tải về
            </Typography>
          </Box>

          <CoreTable
            columns={columns}
            data={dataRowsTable}
            onChangePageSize={onChangePageSize}
            totalPages={toInteger(dataRows.length / queryPage?.size + 1)}
            {...queryPage}
          />
          <div className='flex items-center justify-center w-full mt-8 space-x-10 mb-13'>
            <CoreButton theme='cancel' onClick={hideDialog}>
              Hủy
            </CoreButton>

            <CoreButton
              theme='submit'
              onClick={handleInsertData}
              loading={isLoadingInsertData}
              disabled={dataRows.length - errorLineNumber < 1}
            >
              Nhập dữ liệu
            </CoreButton>
          </div>
        </div>
      )}
    </DialogCustom>
  )
}

export default DialogImport
