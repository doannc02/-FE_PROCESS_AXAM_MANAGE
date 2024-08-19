import { CoreButton } from '@/components/atoms/CoreButton'
import CoreInput from '@/components/atoms/CoreInput'
import PageContainer from '@/components/organism/PageContainer'
import { useCheckPath } from '@/path'
import { MENU_URL } from '@/routes'
import { Grid, IconButton, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import usePaymentTermList from './usePaymentTermList'
import { CoreTable } from '@/components/organism/CoreTable'
import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import { Dashboard } from '@mui/icons-material'
import { UserIcon } from 'lucide-react'

const PaymentTermList = () => {
  const { t } = useTranslation('accounting/payment-term')
  const [values, handles] = usePaymentTermList()
  const { methodForm, columns, tableData, totalPages, size, page, isLoading } =
    values
  const { control } = methodForm
  const { typePath } = useCheckPath()
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
      <div className='flex flex-col'>
        <form onSubmit={onSubmit} className='flex flex-col py-10 px-5'>
          <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={12}>
              <CoreInput
                control={control}
                name='search'
                label={t('common:form.search.label')}
                placeholder={t('common:form.search.placeholder')}
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
            onClick={() =>
              router.push(`${MENU_URL[typePath].PAYMENT_TERM}/addNew`)
            }
          >
            {t('common:btn.add')}
          </CoreButton>
        </div>
        <CoreTable
          tableName='paymentTermList'
          columns={columns}
          data={tableData}
          onChangePageSize={onChangePageSize}
          paginationHidden={tableData.length < 1}
          totalPages={totalPages}
          page={page}
          size={size}
          isLoading={isLoading}
          isShowColumnStt
          onRowClick={(id: number) => {
            router.push({
              pathname: `${MENU_URL[typePath].PAYMENT_TERM}/[id]`,
              query: {
                id: id,
                actionType: 'VIEW',
              },
            })
          }}
        />
      </div>
    </PageContainer>
  )
}

export default PaymentTermList
