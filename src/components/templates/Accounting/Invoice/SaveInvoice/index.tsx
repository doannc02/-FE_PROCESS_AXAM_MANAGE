import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import LoadingPage from '@/components/atoms/LoadingPage'
import CoreNavbar from '@/components/organism/CoreNavbar'
import PageContainer from '@/components/organism/PageContainer'
import { displayTitleHis } from '@/enum'
import { TRANSLATE } from '@/routes'
import { Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { FormProvider } from 'react-hook-form'
import { typeInvoiceOrRefund } from '../Helper/typeInvoiceNew'
import DetailTab from './components/DetailTab'
import GroupButton from './components/GroupButton'
import InventoryExport from './components/InventoryExport'
import InventoryReceiving from './components/InventoryReceiving'
import { InvoiceState } from './components/InvoiceState'
import InvoiceTab from './components/InvoiceTab'
import { MoveLine } from './components/MoveLine'
import RightAction from './components/RightAction/index'
import StatePaymentOfInvoice from './components/StatePaymentOfInvoice'
import useSaveInvoice from './useSaveInvoice'

const SaveInvoice = () => {
  const { t } = useTranslation(TRANSLATE.ACCOUNT_INVOICE)
  const [values, handles] = useSaveInvoice()

  const {
    isLoading,
    pathname,
    id,
    tabNumber,
    actionType,
    data,
    typeInvoice,
    isLoadingSubmit,
    typeOfInvoice,
    typePath,
    invoiceName,
    isUpdate,
    methodForm,
  } = values

  const { watch } = methodForm
  const { onSubmit, refetch } = handles

  const router = useRouter()

  const [isWithInvoiceWatch, scopeTypeWatch, isWithDeliveryNote] = watch([
    'isWithInvoice',
    'scopeType',
    'isWithDeliveryNote',
  ])

  return (
    <PageContainer
      title={
        <div className='flex justify-between w-full'>
          <CoreBreadcrumbs
            isShowDashboard
            breadcrumbs={[
              {
                title: (
                  <Typography>
                    {displayTitleHis[typeInvoiceOrRefund({ router })]}
                  </Typography>
                ),
                pathname: pathname,
              },
              {
                title: (
                  <Typography>
                    {isUpdate
                      ? actionType === 'VIEW'
                        ? t('common:detail')
                        : t('common:btn.edit')
                      : t('common:btn.add')}
                  </Typography>
                ),
              },
            ]}
          />
          <InvoiceState stateInvoice={watch('state')} />
        </div>
      }
    >
      {isLoading ? (
        <LoadingPage />
      ) : (
        <FormProvider {...methodForm}>
          <form onSubmit={onSubmit}>
            <CoreNavbar
              breadcrumbs={[
                {
                  title: 'Chi tiết',
                  content: (
                    <>
                      <StatePaymentOfInvoice
                        state={watch('state')}
                        paymentStatus={watch('paymentStatus')}
                      />
                      <DetailTab data={data} refetch={refetch} />
                      <GroupButton isLoadingSubmit={isLoadingSubmit} />
                    </>
                  ),
                  rightAction: (
                    <RightAction
                      typePrint='INVOICE'
                      id={Number(id)}
                      code={invoiceName}
                      refetch={refetch}
                    />
                  ),
                },
                {
                  title: 'Bút toán',
                  content: (
                    <>
                      <MoveLine />
                      <GroupButton isLoadingSubmit={isLoadingSubmit} />
                    </>
                  ),
                  rightAction: (
                    <RightAction
                      typePrint='MOVE_LINES'
                      id={Number(id)}
                      code={invoiceName}
                      refetch={refetch}
                    />
                  ),
                },
                ...(scopeTypeWatch === 'DOMESTIC_WAREHOUSE' ||
                scopeTypeWatch === 'IMPORTED_WAREHOUSE'
                  ? [
                      {
                        title: 'Phiếu nhập',
                        content: (
                          <>
                            <InventoryReceiving />
                            <GroupButton isLoadingSubmit={isLoadingSubmit} />
                          </>
                        ),
                        rightAction: (
                          <RightAction
                            id={Number(id)}
                            code={invoiceName}
                            refetch={refetch}
                          />
                        ),
                      },
                    ]
                  : []),
                ...(isWithDeliveryNote
                  ? [
                      {
                        title: 'Phiếu xuất',
                        content: (
                          <>
                            <InventoryExport />
                            <GroupButton isLoadingSubmit={isLoadingSubmit} />
                          </>
                        ),
                        rightAction: (
                          <RightAction
                            id={Number(id)}
                            code={invoiceName}
                            refetch={refetch}
                          />
                        ),
                      },
                    ]
                  : []),
                ...(isWithInvoiceWatch
                  ? [
                      {
                        title: 'Hóa đơn',
                        content: (
                          <>
                            <InvoiceTab data={data} refetch={refetch} />
                            <GroupButton isLoadingSubmit={isLoadingSubmit} />
                          </>
                        ),
                        rightAction: (
                          <RightAction
                            id={Number(id)}
                            code={invoiceName}
                            refetch={refetch}
                          />
                        ),
                      },
                    ]
                  : []),
              ]}
              tabNumber={tabNumber}
            />
          </form>
        </FormProvider>
      )}
    </PageContainer>
  )
}

export default SaveInvoice
