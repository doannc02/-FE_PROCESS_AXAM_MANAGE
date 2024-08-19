import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import { CoreButton } from '@/components/atoms/CoreButton'
import CoreInput from '@/components/atoms/CoreInput'
import DotThree from '@/components/icons/DotThree'
import { TopAction } from '@/components/molecules/TopAction'
import { CoreTable } from '@/components/organism/CoreTable'
import PageContainer from '@/components/organism/PageContainer'
import { state } from '@/enum'
import { MENU_URL } from '@/routes'
import { getPartnerList } from '@/service/common/partner/getListTiny'
import { Grid, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import useBankAnhCashAccountList from './useBankAnhCashAccountList'

const BankAndCashAccountList = () => {
  const [values, handles] = useBankAnhCashAccountList()

  const {
    methodForm,
    columns,
    tableData,
    totalPages,
    size,
    page,
    isLoadingTable,
    paymentMethod,
    paymentMethodURL,
    paymentType,
  } = values
  const { control } = methodForm

  const { t, onSubmit, onChangePageSize, onReset } = handles
  const router = useRouter()
  return (
    <PageContainer
      title={
        <CoreBreadcrumbs
          isShowDashboard
          breadcrumbs={[
            {
              title:
                paymentMethod === 'CASH'
                  ? 'Kế toán tiền mặt'
                  : 'Kế toán ngân hàng',
            },
            {
              title:
                paymentType === 'INBOUND'
                  ? t('title.inbound')
                  : t('title.outbound'),
            },
          ]}
        />
      }
    >
      <div className='flex flex-col'>
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
              <CoreAutoCompleteAPI
                control={control}
                name='partner'
                label='Đối tác'
                placeholder='Chọn đối tác'
                valuePath='id'
                labelPath='name'
                labelPath2='code'
                params={{
                  activated: true,
                }}
                fetchDataFn={getPartnerList}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={4} lg={4}>
              <CoreAutocomplete
                control={control}
                name='state'
                label='Trạng thái'
                placeholder='Chọn trạng thái'
                options={state}
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
          <TopAction actionList={['import', 'export']} />
          <DotThree className='mt-3' onClick={() => {}} />
          <CoreButton
            onClick={() =>
              router.push(`${MENU_URL[paymentMethodURL][paymentType]}/addNew`)
            }
          >
            {t('common:btn.add')}
          </CoreButton>
        </div>

        <CoreTable
          tableName='bankAccLst'
          columns={columns}
          data={tableData}
          onChangePageSize={onChangePageSize}
          paginationHidden={tableData.length < 1}
          totalPages={totalPages}
          page={page}
          size={size}
          isLoading={isLoadingTable}
          isShowColumnStt
          onRowClick={(id: number) => {
            router.push({
              pathname: `${
                MENU_URL[
                  paymentMethod === 'BANK' ? 'BANK_ACCOUNT' : 'CASH_ACCOUNT'
                ][paymentType]
              }/[id]`,
              query: {
                id,
                actionType: 'VIEW',
              },
            })
          }}
        />
      </div>
    </PageContainer>
  )
}

export default BankAndCashAccountList
