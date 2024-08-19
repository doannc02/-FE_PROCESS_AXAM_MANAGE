import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import { CoreButton } from '@/components/atoms/CoreButton'
import CoreInput from '@/components/atoms/CoreInput'
import { CoreTable } from '@/components/organism/CoreTable'
import PageContainer from '@/components/organism/PageContainer'
import { MENU_URL } from '@/routes'
import { Grid } from '@mui/material'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import useAccountLedger from './useLedgerList'

type Props = {}

export default function LedgerList({}: Props) {
  const { t } = useTranslation('accounting/account-ledger')

  const [values, handles] = useAccountLedger()

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
              router.push(`${MENU_URL.CONFIG.ACCOUNTING.LEDGER}/addNew`)
            }
          >
            {t('common:btn.add')}
          </CoreButton>
        </div>
        <CoreTable
          tableName='ledgerLst'
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
              pathname: `${MENU_URL.CONFIG.ACCOUNTING.LEDGER}/[id]`,
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
