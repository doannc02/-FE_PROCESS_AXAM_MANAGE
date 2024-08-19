import { CoreButton } from '@/components/atoms/CoreButton'
import { CoreDatePicker } from '@/components/atoms/CoreDatePicker'
import CoreInput from '@/components/atoms/CoreInput'
import { CoreTable } from '@/components/organism/CoreTable'
import PageContainer from '@/components/organism/PageContainer'
import { Grid, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import DialogDebtPayment from '../DialogDebtPayment'
import useDebtInvoiceSale from './useDebtInvoiceSale'

const DebtInvoiceSale = () => {
  const { t } = useTranslation('accounting/debt-receivable')
  const [values, handles] = useDebtInvoiceSale()

  const {
    methodForm,
    columns,
    tableData,
    totalPages,
    size,
    page,
    isLoadingTable,
    methodFormTable,
  } = values
  const { control } = methodForm

  const { showDialog, onSubmit, onChangePageSize, onReset, refetch } = handles

  return (
    <PageContainer
      title={
        <div className='flex justify-between w-full'>
          <div className='flex flex-col justify-center'>
            <Typography variant='subtitle1'>{t('titleInvoice')}</Typography>
          </div>
          <div></div>
        </div>
      }
    >
      <div className='flex flex-col'>
        <form onSubmit={onSubmit} className='flex flex-col mb-15'>
          <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <CoreInput
                control={control}
                name='code'
                label='Mã chứng từ'
                placeholder='Nhập từ khóa'
              />
            </Grid>

            <Grid item xs={12} sm={12} md={4} lg={4}>
              <CoreDatePicker
                control={control}
                name='date'
                title='Ngày lập'
                placeholder='Chọn ngày'
                format='YYYY-MM-DD'
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <CoreDatePicker
                control={control}
                name='dueDate'
                title='Ngày đến hạn'
                placeholder='Chọn ngày'
                format='YYYY-MM-DD'
              />
            </Grid>
          </Grid>

          <div className='flex justify-center mt-15'>
            <div className='m-5'>
              <CoreButton onClick={onReset} theme='reset'>
                Reset
              </CoreButton>
            </div>
            <div className='m-5'>
              <CoreButton theme='submit' type='submit'>
                {t('common:Search')}
              </CoreButton>
            </div>
          </div>
        </form>

        <div className='flex justify-between flex-row-reverse'>
          <CoreButton
            theme='submit'
            type='button'
            onClick={() =>
              showDialog(
                <DialogDebtPayment
                  saleOrderId={[]}
                  invoiceId={methodFormTable.watch('checkedList') ?? []}
                  refetchDebtSale={refetch}
                  refetchDebtException={() => {}}
                />
              )
            }
            disabled={methodFormTable.watch('checkedList').length < 1}
          >
            Thanh toán
          </CoreButton>
        </div>

        <CoreTable
          columns={columns}
          data={tableData}
          onChangePageSize={onChangePageSize}
          paginationHidden={tableData.length < 1}
          totalPages={totalPages}
          page={page}
          size={size}
          isLoading={isLoadingTable}
        />
      </div>
    </PageContainer>
  )
}

export default DebtInvoiceSale
