import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import CoreNavbar from '@/components/organism/CoreNavbar'
import PageContainer from '@/components/organism/PageContainer'
import { MENU_URL, TRANSLATE } from '@/routes'
import { Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import LoadingPage from '@/components/atoms/LoadingPage'
import { useState } from 'react'
import { ViewStockPicking } from './components/ViewStockPicking'
import { useDetailStockPickingRequestList } from './useDetailStockPickingRequestList'
import useCheckPath from '@/components/hooks/path/useCheckPath'

const ViewStockPickingRequestList = () => {
  const { t } = useTranslation(TRANSLATE.WARE_HOUSE)
  const [values] = useDetailStockPickingRequestList()
  const { isLoading, columns, data, tableData } = values
  const { typeWareHouse } = useCheckPath()

  return (
    <PageContainer
      title={
        <div className='flex justify-between w-full'>
          <CoreBreadcrumbs
            isShowDashboard
            breadcrumbs={[
              {
                title: <Typography>Yêu cầu nhập kho</Typography>,
                pathname: `${MENU_URL.WARE_HOUSE[typeWareHouse].IMPORT_WAREHOUSE.STOCK_PICKING_REQUEST}`,
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
                    <ViewStockPicking
                      isLoading={isLoading}
                      columns={columns}
                      data={data}
                      tableData={tableData}
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

export default ViewStockPickingRequestList
