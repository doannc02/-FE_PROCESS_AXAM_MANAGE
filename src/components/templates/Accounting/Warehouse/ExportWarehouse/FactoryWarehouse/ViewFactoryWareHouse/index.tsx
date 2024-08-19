import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import CoreNavbar from '@/components/organism/CoreNavbar'
import PageContainer from '@/components/organism/PageContainer'
import { MENU_URL, TRANSLATE } from '@/routes'
import { Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import LoadingPage from '@/components/atoms/LoadingPage'
import { ViewDetailFactoryWarehouse } from './components/ViewDetailFactoryWarehouse'
import { useViewFactoryWarehouse } from './useViewFactoryWarehouse'
import { ViewExportStockPicking } from '../../StockPickingList/ViewExportStockPickingList/components/ViewExportStockPicking'
import useCheckPath from '@/components/hooks/path/useCheckPath'

const ViewFactoryWareHouse = () => {
  const { t } = useTranslation(TRANSLATE.WARE_HOUSE)
  const [values] = useViewFactoryWarehouse()
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
                title: <Typography>Phiếu xuất kho</Typography>,
                pathname: `${MENU_URL.WARE_HOUSE[typeWareHouse].EXPORT_WAREHOUSE.FACTORY_WAREHOUSE}`,
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
                title: 'Chi tiết',
                content: (
                  <>
                    <ViewDetailFactoryWarehouse
                      isLoading={isLoading}
                      data={data}
                    />
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

export default ViewFactoryWareHouse
