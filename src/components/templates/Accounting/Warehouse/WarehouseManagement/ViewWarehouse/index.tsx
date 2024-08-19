import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import CoreNavbar from '@/components/organism/CoreNavbar'
import PageContainer from '@/components/organism/PageContainer'
import { MENU_URL, TRANSLATE } from '@/routes'
import { Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import LoadingPage from '@/components/atoms/LoadingPage'
import { useState } from 'react'
import { DialogDistributionConfigWarehouse } from './components/ConfigWarehouse'
import { DialogDistributionInformationWarehouse } from './components/InformationWarehouse'
import { useDetailWarehouse } from './useDetailWarehouse'
import useCheckPath from '@/components/hooks/path/useCheckPath'

const ViewWarehouse = () => {
  const { t } = useTranslation(TRANSLATE.WARE_HOUSE)
  const [values] = useDetailWarehouse()
  const { columns, detailData, isLoading, rowsArray } = values
  const { typeWareHouse } = useCheckPath()
  console.log(typeWareHouse, 'typeWareHousest')
  return (
    <PageContainer
      title={
        <div className='flex justify-between w-full'>
          <CoreBreadcrumbs
            isShowDashboard
            breadcrumbs={[
              {
                title: <Typography>{t('title')}</Typography>,
                pathname: `${MENU_URL.WARE_HOUSE[typeWareHouse].MANAGEMENT}`,
              },
              {
                title: <Typography>{detailData?.name}</Typography>,
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
                    <DialogDistributionConfigWarehouse
                      data={detailData}
                      rowArrays={rowsArray}
                      column={columns}
                    />
                  </>
                ),
              },
              {
                title: 'Thông tin kỹ thuật',
                content: (
                  <>
                    <DialogDistributionInformationWarehouse data={detailData} />
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

export default ViewWarehouse
