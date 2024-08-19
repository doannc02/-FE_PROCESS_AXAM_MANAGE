import LoadingPage from '@/components/atoms/LoadingPage'
import PageContainer from '@/components/organism/PageContainer'
import { useQueryGetRequestExportPrint } from '@/service/salesOrder/print'
import { useRouter } from 'next/router'
import { Viewer, Worker } from '@react-pdf-viewer/core'
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'
import '@react-pdf-viewer/core/lib/styles/index.css'
import React from 'react'
import { printWorkerUrl } from '@/config/print'
import { CoreBreadcrumbsV2 } from '@/components/atoms/CoreBreadcrumbsV2'

const RequestExportPrint = () => {
  const router = useRouter()
  const orderId = Number(router.query?.orderId)
  const id = Number(router.query?.id)
  const requestExportName = router.query?.name as string
  const defaultLayoutPluginInstance = defaultLayoutPlugin()
  const { isLoading, data } = useQueryGetRequestExportPrint(
    {
      lineOrderId: id,
    },
    {
      enabled: !!id,
    }
  )
  return (
    <PageContainer
      title={
        <CoreBreadcrumbsV2
          breadcrumbsData={[
            {
              title: 'Đơn bán',
              onClick: () =>
                router.push({ pathname: '/salesOrder/saleOrderManagement' }),
            },
            {
              title: requestExportName,
              onClick: () =>
                router.push({
                  pathname: `/salesOrder/saleOrderManagement/${orderId}`,
                  // query: { id },
                }),
            },
            {
              title: 'Print',
            },
          ]}
        />
      }
    >
      {isLoading && <LoadingPage />}
      {data?.data?.url && (
        <div>
          <Worker workerUrl={printWorkerUrl}>
            <Viewer
              plugins={[defaultLayoutPluginInstance]}
              fileUrl={data?.data?.url}
            />
          </Worker>
        </div>
      )}
    </PageContainer>
  )
}

export default RequestExportPrint
