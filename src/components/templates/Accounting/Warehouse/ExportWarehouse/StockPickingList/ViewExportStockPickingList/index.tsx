import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import CoreNavbar from '@/components/organism/CoreNavbar'
import PageContainer from '@/components/organism/PageContainer'
import { MENU_URL, TRANSLATE } from '@/routes'
import { Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import LoadingPage from '@/components/atoms/LoadingPage'
import { ViewExportStockPicking } from './components/ViewExportStockPicking'
import { useDialogViewDeliveryBillInfomation } from './useViewExportStockPickingList'
import useCheckPath from '@/components/hooks/path/useCheckPath'

const ViewExportStockPickingList = () => {
  const { t } = useTranslation(TRANSLATE.WARE_HOUSE)
  const [values] = useDialogViewDeliveryBillInfomation()
  const { isLoading, data } = values
  const { typeWareHouse } = useCheckPath()

  return (
    <PageContainer
      title={
        <div className='flex justify-between w-full'>
          <CoreBreadcrumbs
            isShowDashboard
            breadcrumbs={[
              {
                title: <Typography>Yêu cầu xuất kho</Typography>,
                pathname: `${MENU_URL.WARE_HOUSE[typeWareHouse].EXPORT_WAREHOUSE.STOCK_PICKING_LIST}`,
              },
              {
                title: <Typography>{data?.code}</Typography>,
              },
            ]}
          />
        </div>
      }
    >
      {isLoading ? (
        <LoadingPage />
      ) : (
        <form>
          <CoreNavbar
            minWidth='150px'
            breadcrumbs={[
              {
                title: 'Cấu hình kho hàng',
                content: (
                  <>
                    <ViewExportStockPicking isLoading={isLoading} data={data} />
                  </>
                ),
              },
            ]}
          />
        </form>
      )}
    </PageContainer>
  )
}

export default ViewExportStockPickingList
