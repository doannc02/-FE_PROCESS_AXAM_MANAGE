import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import { CoreBreadcrumbsV2 } from '@/components/atoms/CoreBreadcrumbsV2'
import LoadingPage from '@/components/atoms/LoadingPage'
import PageContainer from '@/components/organism/PageContainer'
import { printWorkerUrl } from '@/config/print'
import { useCheckPath } from '@/path'
import { MENU_URL } from '@/routes'
import {
  useQueryGetAccountMovePrint,
  useQueryGetInvoicePrint,
} from '@/service/accounting/print/invoice'
import { Typography } from '@mui/material'
import { Viewer, Worker } from '@react-pdf-viewer/core'
import '@react-pdf-viewer/core/lib/styles/index.css'
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import {
  typeInvoiceNew,
  typeInvoiceOrRefund,
  typePathInvoiceNew,
} from '../../../Helper/typeInvoiceNew'
import { displayTitleHis } from '@/enum'

const Print = () => {
  const { t } = useTranslation('accounting/provider-invoice')
  const defaultLayoutPluginInstance = defaultLayoutPlugin()

  const {
    typePath,
    typeOfInvoice,
    typeInvoice: typeCustomerInv,
    typeOfInvoiceCustomer,
    invoiceCk,
  } = useCheckPath()

  const router = useRouter()

  let pathname = useMemo(() => {
    return typePathInvoiceNew(
      typePath,
      invoiceCk,
      typeOfInvoiceCustomer,
      typeCustomerInv,
      typeOfInvoice
    )
  }, [
    invoiceCk,
    typeCustomerInv,
    typeOfInvoice,
    typeOfInvoiceCustomer,
    typePath,
  ])
  const id = Number(router.query?.id)
  const invoiceName = router.query?.invoiceName as string
  const typePrint = router.query?.typePrint as string

  const { isLoading: isLoadingInvoice, data: dataPrintInvoice } =
    useQueryGetInvoicePrint(
      {
        id,
        invoiceType: typePrint,
        typePath: typePath,
      },
      {
        enabled: !!id && typePrint === 'VAT',
      }
    )

  const { isLoading: isLoadingPrintSale, data: dataPrintSale } =
    useQueryGetInvoicePrint(
      {
        id,
        invoiceType: typePrint,
        typePath: typePath,
      },
      {
        enabled: !!id && typePrint === 'SALE',
      }
    )

  const { isLoading: isLoadingAccMove, data: dataPrintAccMove } =
    useQueryGetAccountMovePrint(
      {
        id,
      },
      {
        enabled: !!id && typePrint === 'MOVE_LINES',
      }
    )

  const isLoading = useMemo(() => {
    if (typePath === 'CUSTOMER') {
      if (typePrint === 'SALE') {
        return isLoadingPrintSale
      } else if (typePrint === 'MOVE_LINES') {
        return isLoadingAccMove
      } else return isLoadingInvoice
    } else {
      return typePrint !== 'MOVE_LINES' ? isLoadingInvoice : isLoadingAccMove
    }
  }, [
    isLoadingAccMove,
    isLoadingInvoice,
    isLoadingPrintSale,
    typePath,
    typePrint,
  ])

  const data = useMemo(() => {
    if (typePath === 'CUSTOMER') {
      if (typePrint === 'SALE') {
        return dataPrintSale
      } else if (typePrint === 'MOVE_LINES') {
        return dataPrintAccMove
      } else return dataPrintInvoice
    } else {
      if (typePrint === 'MOVE_LINES') {
        return dataPrintAccMove
      }
    }
  }, [typePath, typePrint, dataPrintInvoice, dataPrintSale, dataPrintAccMove])

  return (
    <PageContainer
      title={
        <CoreBreadcrumbs
          isShowDashboard
          breadcrumbs={[
            {
              title: (
                <Typography>
                  <Typography>
                    Danh sách chứng từ{' '}
                    {displayTitleHis[typeInvoiceOrRefund({ router })]}
                  </Typography>
                </Typography>
              ),
              pathname: pathname,
            },
            {
              title: (
                <div
                  style={{
                    cursor: 'pointer',
                  }}
                  onClick={() => router.back()}
                >
                  <Typography>Chứng từ {invoiceName}</Typography>
                  <div className='flex gap-4 items-center'></div>
                </div>
              ),
            },
            {
              title: <Typography>In</Typography>,
            },
          ]}
        />
      }
    >
      {isLoading && !data?.data?.url && <LoadingPage />}

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

export default Print
