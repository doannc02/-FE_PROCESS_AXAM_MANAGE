import LoadingPage from '@/components/atoms/LoadingPage'
import PageContainer from '@/components/organism/PageContainer'
import { printWorkerUrl } from '@/config/print'
import { useCheckPath } from '@/path'
import { MENU_URL, TRANSLATE } from '@/routes'
import { useQueryGetReceiptPaymentPrint } from '@/service/accounting/print/receiptPayment'
import { Viewer, Worker } from '@react-pdf-viewer/core'
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'

import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'

const BankAndCashAccountPrint = () => {
  const { t } = useTranslation(TRANSLATE.BANK_CASH_ACCOUNT)
  const defaultLayoutPluginInstance = defaultLayoutPlugin()
  const router = useRouter()
  const id = Number(router.query?.id)
  const code = router.query?.code

  const { paymentType, paymentMethodURL, paymentMethod } = useCheckPath()

  const { isLoading, data } = useQueryGetReceiptPaymentPrint(
    {
      id,
    },
    {
      enabled: !!id,
    }
  )
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
              pathname: MENU_URL[paymentMethodURL][paymentType],
            },
            {
              title: code,
              pathname: `${MENU_URL[paymentMethodURL][paymentType]}/${id}`,
            },
            {
              title: 'In',
            },
          ]}
        />
      }
    >
      {isLoading && (
        <div className='min-h-[600px] flex justify-center items-center'>
          <LoadingPage />
        </div>
      )}

      {data?.data?.url && (
        <div>
          <Worker workerUrl={printWorkerUrl}>
            <Viewer
              plugins={[defaultLayoutPluginInstance]}
              fileUrl={data?.data.url}
            />
          </Worker>
        </div>
      )}
    </PageContainer>
  )
}

export default BankAndCashAccountPrint
