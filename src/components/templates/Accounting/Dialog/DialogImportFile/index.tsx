import { CoreButton } from '@/components/atoms/CoreButton'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import { DialogCustom } from '@/components/organism/DialogCustom'
import { GREEN, PRIMARY, RED } from '@/helper/colors'
import { ResponseBody } from '@/service/accounting/accountConfig/importFile/importAccountConfigFile/type'
import { BaseResponse } from '@/service/type'
import { Box, CircularProgress, Typography } from '@mui/material'
import Image from 'next/image'
import { CoreInputFile } from './CoreInputFile'
import { LinearWithValueLabel } from './LinearWithValueLabelCustomer'
import { useDialogImportFile } from './useDialogImportFile'

export type Props = {
  refetch: () => void
  fetchDataImport: (
    accountLedgerId: number,
    requestBody: any
  ) => Promise<ResponseBody['POST']>
  fetchDataExport: (accountLedgerId: number) => Promise<BaseResponse<any>>
  label: string
}

export const DialogImportFile = (props: Props) => {
  const { label } = props
  const { hideDialog } = useDialog()
  const [values, handles] = useDialogImportFile(props)
  const { file, loadingImport, importResult } = values
  const {
    handleGetProductTemplateFile,
    handleSaveFile,
    handleDeleteFile,
    onSubmit,
    handleDownloadFileByURL,
  } = handles

  const renderFormUpload = () => {
    return (
      <div className='p-15'>
        <div
          className='flex items-center cursor-pointer min-w-[120px]'
          onClick={handleGetProductTemplateFile}
        >
          <Image
            src={require('@/assets/svg/importIcon.svg')}
            alt='import'
            width={16}
            height={16}
          />
          <Typography style={{ color: GREEN, marginLeft: '4px' }}>
            Download mẫu
          </Typography>
        </div>
        <CoreInputFile
          file={file}
          handleSaveFile={handleSaveFile}
          label={label}
        />
        <Typography>
          <span style={{ color: RED }}>Lưu ý: </span>Hệ thống chỉ cho phép
          upload tối đa 1000 dòng tại 1 thời điểm.
        </Typography>
        {!!file && (
          <LinearWithValueLabel
            onClose={handleDeleteFile}
            fileName={file.name ?? 'template.xlsx'}
          />
        )}
        <div className='flex justify-center gap-5 mt-10'>
          <CoreButton
            theme='cancel'
            onClick={() => {
              hideDialog()
            }}
          >
            Hủy
          </CoreButton>
          <CoreButton onClick={onSubmit} theme={'submit'}>
            Upload
          </CoreButton>
        </div>
      </div>
    )
  }

  const renderLoading = () => {
    return (
      <Box className='text-center p-15'>
        <CircularProgress thickness={8} size={60} />
        <div className='my-10'>
          <Typography>
            Vui lòng đợi trong giây lát, không
            <span style={{ fontWeight: 'bold' }}> Tắt</span> trình duyệt hoặc
            bấm nút <span style={{ fontWeight: 'bold' }}>Thoát</span>
          </Typography>
        </div>
        <div className='my-10'>
          <Typography>Quá trình upload file của bạn sắp hoàn tất...</Typography>
        </div>
      </Box>
    )
  }

  const renderResultImport = () => {
    return (
      <div className='p-15'>
        <div className='text-center min-w-[120px]'>
          <Typography>
            Import thành công {importResult?.successRecording}/
            {importResult?.totalRecording} bản ghi
          </Typography>
          <div>
            <Typography
              className='cursor-pointer'
              color={PRIMARY}
              variant='h5'
              marginTop={2}
              onClick={() =>
                handleDownloadFileByURL(importResult?.urlResult ?? '')
              }
            >
              Download file kết quả tại đây
            </Typography>
          </div>
        </div>
      </div>
    )
  }

  return (
    <DialogCustom title={'Import'} onClose={hideDialog}>
      {loadingImport
        ? renderLoading()
        : importResult
        ? renderResultImport()
        : renderFormUpload()}
    </DialogCustom>
  )
}
