import { CoreButton } from '@/components/atoms/CoreButton'
import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import MyAntTabs from '@/components/atoms/MyAntTab'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import PageContainer from '@/components/organism/PageContainer'
import { CustomTable } from '@/components/organism/TableCustom'
import { Tab } from '@mui/material'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import DialogDebtPayment from '../DialogDebtPayment'
import useDebtReceivableDetail from './useDebtDetail'

const DebtDetail = () => {
  const { t } = useTranslation('accounting/debt-receivable')
  const [values, handles] = useDebtReceivableDetail()
  const {
    methodFormTable,
    columns1,
    totalPages1,
    size1,
    page1,
    isLoadingDebtSale,
    rowDebtSaleData,
    columns2,
    isLoadingDebtException,
    rowDebtExceptionData,
    totalPages2,
    size2,
    page2,
  } = values

  const { showDialog } = useDialog()
  const { onChangePageSize, refetchDebtSale, refetchDebtException } = handles

  const [valueTab, setValueTab] = useState<'POLICY' | 'EXCEPTION'>('POLICY')
  const handleChangeTab = (
    _: React.SyntheticEvent,
    newValue: 'POLICY' | 'POLICY'
  ) => {
    methodFormTable.reset()
    setValueTab(newValue)
  }

  return (
    <PageContainer
      title={
        <CoreBreadcrumbs textCurrent={t('detail')} textPrev={t('title')} />
      }
    >
      <div className='flex flex-col'>
        <div className='flex justify-between'>
          <MyAntTabs
            value={valueTab}
            onChange={handleChangeTab}
            variant='scrollable'
            style={{
              borderBottom: 'none',
            }}
          >
            <Tab label='Công nợ theo chính sách' value='POLICY' />
            <Tab label='Công nợ ngoại lệ' value='EXCEPTION' />
          </MyAntTabs>
          <CoreButton
            theme='submit'
            type='button'
            onClick={() =>
              showDialog(
                <DialogDebtPayment
                  saleOrderId={
                    valueTab === 'POLICY'
                      ? methodFormTable.watch('checkedList')
                      : []
                  }
                  invoiceId={
                    valueTab === 'EXCEPTION'
                      ? methodFormTable.watch('checkedList')
                      : []
                  }
                  refetchDebtSale={refetchDebtSale}
                  refetchDebtException={refetchDebtException}
                />
              )
            }
            disabled={methodFormTable.watch('checkedList').length < 1}
          >
            Thanh toán
          </CoreButton>
        </div>

        {valueTab === 'POLICY' && (
          <CustomTable
            isLoading={isLoadingDebtSale}
            columns={columns1}
            data={rowDebtSaleData}
            onChangePageSize={onChangePageSize}
            paginationHidden={rowDebtSaleData.length < 1}
            totalPages={totalPages1}
            page={page1}
            size={size1}
          />
        )}

        {valueTab === 'EXCEPTION' && (
          <CustomTable
            isLoading={isLoadingDebtException}
            columns={columns2}
            data={rowDebtExceptionData}
            onChangePageSize={onChangePageSize}
            paginationHidden={rowDebtExceptionData.length < 1}
            totalPages={totalPages2}
            page={page2}
            size={size2}
          />
        )}
      </div>
    </PageContainer>
  )
}

export default DebtDetail
