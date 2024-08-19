import { CoreButton } from '@/components/atoms/CoreButton'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import { DialogCustom } from '@/components/organism/DialogCustom'
import { Box, Typography } from '@mui/material'

import { useTranslation } from 'react-i18next'
import { useDialogViewHisImport } from './useDialogViewHisImport'
import { CustomTable } from '@/components/organism/TableCustom'
import { useRouter } from 'next/router'
type Props = {
    isCustomer : boolean
}
const DialogViewHisImport = ({isCustomer}: Props) => {
  const { t } = useTranslation('accounting/cop-balance')
  const { hideDialog } = useDialog()
  const router = useRouter()
  const [values, handles] = useDialogViewHisImport({isCustomer})
  const { isLoading, columns, dataTable, page, size, totalPages } = values
  const { onSubmit, onChangePageSize } = handles

  return (
    <DialogCustom title='' onClose={hideDialog} width={1010}>
      <Box className='flex justify-center px-25 m-auto align-middle text-center'>
        <Typography
          variant='h6'
          style={{
            lineHeight: 1.5,
          }}
        >
          Lịch sử Import
        </Typography>
      </Box>
      <Box className='mx-20'>
      <CustomTable
        className='my-15'
        columns={columns}
        data={dataTable}
        onChangePageSize={onChangePageSize}
        paginationHidden={dataTable.length < 1}
        isShowColumnStt
        totalPages={totalPages}
        page={page}
        size={size}
        isLoading={isLoading}
      />
      </Box>
    </DialogCustom>
  )
}

export default DialogViewHisImport
