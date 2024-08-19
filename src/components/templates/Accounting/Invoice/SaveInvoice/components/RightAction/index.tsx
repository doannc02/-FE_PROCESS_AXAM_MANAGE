import { useDialog } from '@/components/hooks/dialog/useDialog'
import { TopAction } from '@/components/molecules/TopAction'
import DialogConfirmDraft from '@/components/templates/Accounting/Dialog/DialogConfirmDraft'
import DialogCopyInvoice from '@/components/templates/Accounting/Dialog/DialogCopyInvoice'
import DialogDeleteAccountMove from '@/components/templates/Accounting/Dialog/DialogDeleteAccountMove'
import DialogHisUpdateList from '@/components/templates/Accounting/Dialog/DialogHistoryEditBound'
import DialogPayment from '@/components/templates/Accounting/Dialog/DialogPayment'
import { useCheckPath } from '@/path'
import { MENU_URL } from '@/routes'
import { AccountMoveDetail } from '@/service/accounting/accountMove/getDetail/type'
import { useRouter } from 'next/router'
import { memo, useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import {
  typeInvoiceOrRefund,
  typePathInvoiceNew,
} from '../../../Helper/typeInvoiceNew'
import { Menu } from '@mui/material'
import MenuSelectPrint from './components/MenuSelectPrint'
import { displayThuChi } from '@/enum'

const RightAction = ({
  typePrint,
  id,
  code,
  refetch,
}: {
  id: number
  code: string
  refetch: any
  typePrint?: 'MOVE_LINES' | 'INVOICE'
}) => {
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
  const { actionType } = router.query
  const isUpdate = !!id

  const moveType = useMemo(() => {
    return typeInvoiceOrRefund({ router })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.pathname])

  const { showDialog } = useDialog()
  const { watch, control } = useFormContext<AccountMoveDetail>()

  return (
    <div className='flex justify-center'>
      {watch('state') !== 'DRAFT' && (
        <MenuSelectPrint
          arraySelect={[
            ...(typePath === 'CUSTOMER' && watch('isWithInvoice')
              ? [
                  {
                    title: 'Hóa đơn GTGT',
                    fnSelect: () => {
                      router.push({
                        pathname: `${pathname}/[id]/print`,
                        query: {
                          id,
                          invoiceName: code,
                          typePrint: 'VAT',
                        },
                      })
                    },
                  },
                  {
                    title: 'Hóa đơn bán hàng',
                    fnSelect: () => {
                      router.push({
                        pathname: `${pathname}/[id]/print`,
                        query: {
                          id,
                          invoiceName: code,
                          typePrint: 'SALE',
                        },
                      })
                    },
                  },
                ]
              : []),
            {
              title: 'Chứng từ kế toán',
              fnSelect: () => {
                router.push({
                  pathname: `${pathname}/[id]/print`,
                  query: {
                    id,
                    invoiceName: code,
                    typePrint: 'MOVE_LINES',
                  },
                })
              },
            },
          ]}
        />
      )}

      <TopAction
        actionList={
          [
            ...(watch('state') === 'AWAITING_POSTED'
              ? ['draft', 'draft', 'copy', 'delete', 'history']
              : []),
            ...(watch('state') === 'POSTED'
              ? ['draft', 'payment', 'draft', 'copy', 'history']
              : []),
            ...(actionType === 'VIEW' && watch('state') === 'DRAFT'
              ? ['copy', 'edit', 'delete', 'history']
              : []),
            ...(isUpdate && watch('state') === 'DRAFT'
              ? ['history', 'copy']
              : []),
            ...(['NOT_PAYMENT', 'PARTIAL_PAYMENT'].includes(
              watch('paymentStatus')
            ) && watch('state') === 'POSTED'
              ? ['payment']
              : []),
          ] as any
        }
        onPaymentAction={() => {
          showDialog(
            <DialogPayment
              paymentTypeOfInv={watch('paymentMethod')}
              bankAccount={watch('bankAccount')}
              id={id}
              name={`${displayThuChi[typeInvoiceOrRefund({ router })]} ${watch(
                'partner.name'
              )} chứng từ ${watch('code')}`}
              type='INBOUND'
              amount={
                watch('paymentStatus') === 'NOT_PAYMENT'
                  ? watch('amountTotal')
                  : watch('paymentStatus') === 'PARTIAL_PAYMENT'
                  ? watch('moneyPaid')
                  : 0
              }
              refetch={refetch}
            />
          )
        }}
        onDraftAction={() =>
          showDialog(
            <DialogConfirmDraft id={id} type='INVOICE' refetch={refetch} />
          )
        }
        onCopyAction={() => {
          showDialog(
            <DialogCopyInvoice
              id={id}
              refetch={() => {
                router.push({
                  pathname: `${pathname}`,
                })
              }}
            />
          )
        }}
        onEditAction={() => {
          router.replace({
            pathname: `${pathname}/[id]`,
            query: {
              id,
            },
          })
        }}
        onDeleteAction={() => {
          showDialog(
            <DialogDeleteAccountMove
              id={id}
              refetch={() => {
                router.push({
                  pathname: `${pathname}`,
                })
              }}
            />
          )
        }}
        onHistoryAction={() => {
          showDialog(
            <DialogHisUpdateList
              changeId={id}
              code={code}
              historyType={moveType}
              refetch={refetch}
            />
          )
        }}
      />
    </div>
  )
}

export default memo(RightAction)
