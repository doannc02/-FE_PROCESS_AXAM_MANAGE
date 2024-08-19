import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import { CoreButton } from '@/components/atoms/CoreButton'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import { CoreTable } from '@/components/organism/CoreTable'
import PageContainer from '@/components/organism/PageContainer'
import { MENU_URL } from '@/routes'
import { Dashboard } from '@mui/icons-material'
import { Grid, IconButton, Typography } from '@mui/material'
import { Battery } from 'lucide-react'
import { useRouter } from 'next/router'
import { FormProvider } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import SearchAdvanced from '../../Components/SearchAdvancedEsc'
import DialogSelectAllocation from '../Dialog/DialogSelectAllocation'
import { MonitoringTotal } from './MonitoringTotal'
import useMonitoringList from './useMonitoringList'

const MonitoringList = () => {
  const { t } = useTranslation('')
  const [values, handles] = useMonitoringList()
  const { showDialog } = useDialog()
  const {
    totalAmount,
    typeToolAsset,
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
              title: (
                <Typography>
                  {typeToolAsset === 'ASSET'
                    ? 'Theo dõi khấu hao Tài sản'
                    : 'Theo dõi phân bổ CCDC'}
                </Typography>
              ),
            },
          ]}
        />
      }
    >
      <FormProvider {...methodForm}>
        <form onSubmit={onSubmit} className='flex flex-col py-10 px-5'>
          <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <SearchAdvanced
                isShowSearchForDateTime={true}
                onReset={onReset}
                onSubmit={() => {}}
              />
            </Grid>
          </Grid>
        </form>
      </FormProvider>

      {/* <div className='py-4 flex justify-end gap-4 items-center'>
        <CoreButton
          theme='submit'
          onClick={() =>
            showDialog(<DialogSelectAllocation title='Chọn kỳ phân bổ' />)
          }
        >
          {t('common:btn.add')}
        </CoreButton>
      </div> */}
      <CoreTable
        tableName={`escAssetLst${typeToolAsset}`}
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
          let pathname
          if (row.typeAddNew === 'HANDMADE') {
            pathname = `${MENU_URL[typeToolAsset].ESC}/handMade/[id]`
          } else {
            pathname = `${MENU_URL[typeToolAsset].ESC}/toolsOrAsset/[id]`
          }
          router.push({
            pathname: pathname,
            query: {
              id,
              actionType: 'VIEW',
            },
          })
        }}
        actionTable={
          totalAmount?.data ? (
            <MonitoringTotal
              isFlag={!!totalAmount}
              total={Number(totalAmount?.data)}
            />
          ) : null
        }
      />
    </PageContainer>
  )
}

export default MonitoringList
