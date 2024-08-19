import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import { CoreButton } from '@/components/atoms/CoreButton'
import { CoreDatePicker } from '@/components/atoms/CoreDatePicker'
import CoreInput from '@/components/atoms/CoreInput'
import { CoreTable } from '@/components/organism/CoreTable'
import PageContainer from '@/components/organism/PageContainer'
import { paymentStatusEnum } from '@/enum'
import { MENU_URL } from '@/routes'
import { Grid } from '@mui/material'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import useEntryInvoiceList from './useEntryInvoiceList'

const EntryInvoiceList = () => {
  const { t } = useTranslation('accounting/entry-invoice')
  const [values, handles] = useEntryInvoiceList()

  const {
    methodForm,
    columns,
    tableData,
    totalPages,
    size,
    page,
    isLoadingTable,
  } = values
  const { control } = methodForm

  const { onSubmit, onChangePageSize, onReset } = handles
  const router = useRouter()
  return (
    <PageContainer
      title={
        <CoreBreadcrumbs
          isShowDashboard
          breadcrumbs={[
            {
              title: t('title'),
            },
          ]}
        />
      }
    >
      <form onSubmit={onSubmit} className='flex flex-col py-10 px-5'>
        <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <CoreInput
              control={control}
              name='search'
              label={t('common:form.search.label')}
              placeholder={t('common:form.search.placeholder')}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <CoreAutocomplete
              control={control}
              name='paymentStatus'
              label='Thanh toán'
              placeholder='Chọn thanh toán'
              options={paymentStatusEnum}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <CoreDatePicker
              control={control}
              name='startDate'
              title='Ngày lập chứng từ (từ)'
              placeholder='Chọn ngày'
              format='YYYY-MM-DD'
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <CoreDatePicker
              control={control}
              name='endDate'
              title='Ngày lập chứng từ (đến)'
              placeholder='Chọn ngày'
              format='YYYY-MM-DD'
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <CoreDatePicker
              control={control}
              name='startDueDate'
              title='Ngày đến hạn (từ)'
              placeholder='Chọn ngày'
              format='YYYY-MM-DD'
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <CoreDatePicker
              control={control}
              name='endDueDate'
              title='Ngày hết hạn'
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

      <div className='py-4 flex justify-end gap-4 items-center'>
        <CoreButton
          theme='submit'
          onClick={() => router.push(`${MENU_URL.ENTRY.ENTRY_INVOICE}/addNew`)}
        >
          {t('common:btn.add')}
        </CoreButton>
      </div>

      <CoreTable
        tableName='entryInvoiceLst'
        columns={columns}
        data={tableData}
        onChangePageSize={onChangePageSize}
        paginationHidden={tableData.length < 1}
        totalPages={totalPages}
        page={page}
        size={size}
        isLoading={isLoadingTable}
        isShowColumnStt
        onRowClick={(id: number, row: any) => {
          router.push({
            pathname: row?.pathname,
            query: {
              id,
              actionType: 'VIEW',
            },
          })
        }}
      />
    </PageContainer>
  )
}

export default EntryInvoiceList
