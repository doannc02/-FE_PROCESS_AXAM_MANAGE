import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import CoreCheckbox from '@/components/atoms/CoreCheckbox'
import { CoreDatePicker } from '@/components/atoms/CoreDatePicker'
import CoreInput from '@/components/atoms/CoreInput'
import { WarningText } from '@/components/atoms/WarningText'
import { Action } from '@/components/molecules/Action'
import { TableCustomDnd } from '@/components/organism/TableCustomDnd'
import { ActionTable } from '@/components/organism/TableCustomDnd/ActionTable'
import { DialogAddSTKBank } from '@/components/templates/Accounting/BankAndCashAccount/DialogAddSTKBank'
import RenderAnotherBook from '@/components/templates/Accounting/Customer/Components/RenderAnotherBook'
import {
  displayWarehouse,
  paymentMethodSelect,
  scopeCustomerTypeSelect,
  scopeType,
  warehouseType,
} from '@/enum'
import { PRIMARY } from '@/helper/colors'
import { useCheckPath } from '@/path'
import { useAppSelector } from '@/redux/hook'
import { getAccountJournalList } from '@/service/accounting/accountJournal/getList'
import { AccountMoveDetail } from '@/service/accounting/accountMove/getDetail/type'
import { getPaymentTermList } from '@/service/accounting/paymentTerm/getList'
import { getAddressList } from '@/service/common/address/getList'
import { getBranchList } from '@/service/common/branch/getList'
import { getBankOfCompanyList } from '@/service/common/company/getListBank'
import { getBankAccountByPartnerList } from '@/service/common/partner/getListBankAccountByPartner'
import {
  getPartnerList,
  getPartnerListForMerchant,
} from '@/service/common/partner/getListTiny'
import { getPriceListByCurrencyNew } from '@/service/product/priceList/getPriceListByCurrency'
import { getListWarehouse } from '@/service/salesOrder/returnOrderController/createUpdate'
import { BaseResponse } from '@/service/type'
import { Grid, Typography } from '@mui/material'
import { useState } from 'react'
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
  useQueryClient,
} from 'react-query'
import GroupCheckBox from '../GroupCheckBox'
import InvoicePaymentInfo from '../InvoicePaymentInfo'
import useDetailTab from './useDetailTab'

const DetailTab = ({
  refetch,
  data,
}: {
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<BaseResponse<AccountMoveDetail>, unknown>>
  data: BaseResponse<AccountMoveDetail> | undefined
}) => {
  const [paramsPartnerExt, setParamsPartnerExt] = useState({})
  const [isOpenDialogSTK, setIsOpenDialogSTK] = useState(false)
  const [isOpenDialogSTKPartner, setIsOpenDialogSTKPartner] = useState(false)
  const queryClient = useQueryClient()
  const [values, handles] = useDetailTab()
  const { invoiceCk, typeInvoice } = useCheckPath()

  const renderAddSTK = () => (
    <div
      className='flex items-center gap-1 cursor-pointer'
      onClick={() => {
        setIsOpenDialogSTK(true)
      }}
    >
      <Action actionList={['append']} />
      <Typography variant='caption' color={PRIMARY}>
        Tạo nhanh STK
      </Typography>
    </div>
  )

  const renderAddSTKPartner = () => (
    <div
      className='flex items-center gap-1 cursor-pointer'
      onClick={() => {
        setIsOpenDialogSTKPartner(true)
      }}
    >
      <Action actionList={['append']} />
      <Typography variant='caption' color={PRIMARY}>
        Tạo nhanh STK
      </Typography>
    </div>
  )

  const {
    isView,
    fieldLedgerRefs,
    isUpdate,
    actionType,
    control,
    invoiceLinesTableData,
    paymentType,
    invoiceColumns,
    typeCustomerOrProvider,
    currencyId,
    methodForm,
    type,
  } = values

  const {
    t,
    onAfterChangeValue,
    setValue,
    router,
    watch,
    appendInvoiceLines,
    appendLedgerRefs,
    removeLedgerRefs,
    paramsPartner,
  } = handles

  console.log(router.pathname, 'path')
  const { id: idLedger, code: codeLedger } = useAppSelector(
    (state) => state.ledgerRefData
  )
  const { id: idBranch } = useAppSelector((state) => state.branchData)
  const { id: companyId } = useAppSelector((state) => state.companyConfigData)

  return (
    <>
      {watch('moneyPaid') > 0 &&
        watch('moneyBalanceResponses') &&
        watch('moneyBalanceResponses').length > 0 && (
          <div className='py-4'>
            <WarningText bgColor='#abdbe3'>
              Bạn có các khoản tín dụng chưa thanh toán với khách hàng này. Bạn
              có thể phân bổ chúng để ghi nhận là hóa đơn này đã thanh toán.
            </WarningText>
          </div>
        )}
      <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
        {isUpdate && (
          <Grid
            item
            xs={12}
            style={{
              marginBottom: '15px',
            }}
          >
            <Typography variant='h6'>
              {data ? data?.data?.code : null}
            </Typography>
          </Grid>
        )}

        <GroupCheckBox />

        <Grid item xs={12} sm={12} md={4} lg={4}>
          <CoreInput
            control={control}
            name='code'
            label='Số chứng từ'
            placeholder='Nhập số chứng từ'
            inputProps={{ maxLength: 50 }}
            disabled={isUpdate}
          />
        </Grid>

        {watch('orderName') && (
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <CoreInput
              control={control}
              name='orderName'
              label='Đơn hàng'
              readOnly
              inputProps={{ maxLength: 50 }}
            />
          </Grid>
        )}

        <Grid item xs={12} sm={12} md={4} lg={4}>
          <CoreAutocomplete
            control={control}
            name='scopeType'
            label='Loại chứng từ'
            placeholder='Chọn loại chứng từ'
            options={
              typeCustomerOrProvider === 'PROVIDER'
                ? scopeType
                : scopeCustomerTypeSelect
            }
            required
            rules={{
              required: t('common:validation.required'),
            }}
            onChangeValue={(val) => {
              setValue('invoiceLines', [
                {
                  unitPrice: 0,
                  uom: null,
                  product: null,
                  discount: 0,
                  quantity: 0,
                  discountAmount: 0,
                  amountTotal: 0,
                  amountUntaxed: 0,
                  lineTax: 0,
                  importTax: 0,
                  specialConsumptionTax: 0,
                  environmentalResourceTax: 0,
                  vat: 0,
                } as any,
              ])
              setValue(`invoiceLines.${0}.amountUntaxed`, 0)
              setValue(`invoiceLines.${0}.quantity`, 0)
              setValue(`invoiceLines.${0}.unitPrice`, 0)
              setValue(`invoiceLines.${0}.taxes`, [])
              setValue('moveLines', [])
            }}
          />
        </Grid>

        {typeCustomerOrProvider === 'PROVIDER' ? (
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <CoreAutoCompleteAPI
              control={control}
              name='partner'
              label={`${
                typeCustomerOrProvider === 'PROVIDER'
                  ? 'Nhà cung cấp'
                  : typeInvoice === 'INTERNAL'
                  ? 'Chi nhánh'
                  : 'Khách hàng'
              }`}
              labelPath2='code'
              placeholder={`${
                typeCustomerOrProvider === 'PROVIDER'
                  ? 'Chọn nhà cung cấp'
                  : typeInvoice === 'INTERNAL'
                  ? 'Chọn chi nhánh'
                  : 'Chọn hàng'
              }`}
              required
              fetchDataFn={
                watch('saleType') !== 'MERCHANT' && typeInvoice !== 'MERCHANT'
                  ? typeInvoice === 'INTERNAL'
                    ? getBranchList
                    : getPartnerList
                  : getPartnerListForMerchant
              }
              params={{
                isVendor: true,
                vendorActivated: true,
              }}
              rules={{
                required: t('common:validation.required'),
              }}
              onChangeValue={(val) => {
                setValue('invoiceLines', [
                  {
                    unitPrice: 0,
                    uom: null,
                    product: null,
                    discount: 0,
                    quantity: 0,
                    discountAmount: 0,
                    amountTotal: 0,
                    amountUntaxed: 0,
                    lineTax: 0,
                    importTax: 0,
                    specialConsumptionTax: 0,
                    environmentalResourceTax: 0,
                    vat: 0,
                  } as any,
                ])
                setValue(`invoiceLines.${0}.lineTax`, 0)
                setValue(`invoiceLines.${0}.importTax`, 0)
                setValue(`invoiceLines.${0}.amountUntaxed`, 0)
                setValue(`invoiceLines.${0}.quantity`, 0)
                setValue(`invoiceLines.${0}.unitPrice`, 0)
                setValue(`invoiceLines.${0}.taxes`, [])
                setValue('moveLines', [])
              }}
            />
          </Grid>
        ) : (
          <>
            {(router.pathname.includes('/normal/addNew') ||
              router.pathname.includes(
                '/customer/customerInvoice/normal/[id]'
              )) &&
              typeInvoice !== 'INTERNAL' && (
                <Grid item xs={12} sm={12} md={4} lg={4}>
                  <CoreAutocomplete
                    control={control}
                    name='saleType'
                    label='Loại Khách hàng'
                    placeholder='Chọn khách hàng'
                    required
                    rules={{
                      required: t('common:validation.required'),
                    }}
                    options={[
                      { value: 'OEM', label: 'OEM' },
                      { value: 'B2B', label: 'B2B' },
                      { value: 'B2C', label: 'B2C' },
                      { value: 'MERCHANT', label: 'Merchant' },
                    ]}
                    onChangeValue={async (val) => {
                      setValue('partner', null)
                      setValue('priceList', null)
                      const params = paramsPartner(val)
                      setParamsPartnerExt(params)
                      if (val === 'OEM') {
                        setValue('isTakePricePolicy', false)
                      }
                      setValue('invoiceLines', [
                        {
                          unitPrice: 0,
                          uom: null,
                          product: null,
                          discount: 0,
                          quantity: 0,
                          discountAmount: 0,
                          amountTotal: 0,
                          amountUntaxed: 0,
                          lineTax: 0,
                          importTax: 0,
                          specialConsumptionTax: 0,
                          environmentalResourceTax: 0,
                          vat: 0,
                        } as any,
                      ])
                      setValue(`invoiceLines.${0}.amountUntaxed`, 0)
                      setValue(`invoiceLines.${0}.quantity`, 0)
                      setValue(`invoiceLines.${0}.unitPrice`, 0)
                      setValue(`invoiceLines.${0}.taxes`, [])
                      setValue('moveLines', [])
                    }}
                    readOnly={watch('state') === 'POSTED'}
                  />
                </Grid>
              )}
            {typeCustomerOrProvider === 'CUSTOMER' &&
            typeInvoice !== 'INTERNAL' ? (
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <CoreAutoCompleteAPI
                  control={control}
                  name='partner'
                  label='Khách hàng'
                  placeholder='Chọn khách  hàng'
                  labelPath2='code'
                  required
                  params={
                    typeInvoice !== 'EXTERNAL'
                      ? {
                          ...paramsPartner(typeInvoice),
                        }
                      : {
                          ...paramsPartnerExt,
                        }
                  }
                  fetchDataFn={
                    watch('saleType') !== 'MERCHANT' &&
                    typeInvoice !== 'MERCHANT'
                      ? getPartnerList
                      : getPartnerListForMerchant
                  }
                  rules={{
                    required: t('common:validation.required'),
                    validate: {
                      ckValidPath2: (val: any) => {
                        return (
                          val.code !== '' || t('common:validation.required')
                        )
                      },
                    },
                  }}
                  onChangeValue={(val) => {
                    queryClient.invalidateQueries({
                      queryKey: ['api/v1/partners/branch-list-tiny'],
                    })
                    setValue('invoiceLines', [
                      {
                        unitPrice: 0,
                        uom: null,
                        product: null,
                        discount: 0,
                        discountAmount: 0,
                        amountTotal: 0,
                        amountUntaxed: 0,
                        lineTax: 0,
                        taxes: [],
                        importTax: 0,
                        specialConsumptionTax: 0,
                        environmentalResourceTax: 0,
                        vat: 0,
                      } as any,
                    ])
                  }}
                  readOnly={watch('state') === 'POSTED'}
                />
              </Grid>
            ) : (
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <CoreAutoCompleteAPI
                  control={control}
                  name='partner'
                  label='Chi nhánh'
                  placeholder='Chọn chi nhánh'
                  labelPath2='code'
                  required
                  params={{
                    isDefaultCompany: true,
                    activated: true,
                    branchNowId: idBranch ?? companyId,
                  }}
                  fetchDataFn={getBranchList}
                  rules={{
                    required: t('common:validation.required'),
                  }}
                  readOnly={watch('state') === 'POSTED'}
                  onChangeValue={() =>
                    setValue('invoiceLines', [
                      {
                        unitPrice: 0,
                        uom: null,
                        product: null,
                        discount: 0,
                        quantity: 0,
                        discountAmount: 0,
                        amountTotal: 0,
                        amountUntaxed: 0,
                        lineTax: 0,
                        taxes: [],
                        importTax: 0,
                        specialConsumptionTax: 0,
                        environmentalResourceTax: 0,
                        vat: 0,
                      } as any,
                    ])
                  }
                />
              </Grid>
            )}
          </>
        )}

        <Grid item xs={12} sm={12} md={4} lg={4}>
          <CoreAutoCompleteAPI
            control={control}
            name='accountJournal'
            label='Sổ kế toán'
            placeholder='Chọn sổ kế toán'
            required
            fetchDataFn={getAccountJournalList}
            params={{
              type: typeCustomerOrProvider === 'PROVIDER' ? 'PURCHASE' : 'SALE',
              accountLedgerId: idLedger,
            }}
            onChangeValue={onAfterChangeValue}
            rules={{ required: t('common:validation.required') }}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={4} lg={4}>
          <CoreDatePicker
            control={control}
            name='date'
            title='Ngày lập chứng từ'
            placeholder='Chọn ngày lập chứng từ'
            required
            format='YYYY-MM-DD'
            rules={{
              required: t('common:validation.required'),
            }}
          />
        </Grid>

        {!watch('paymentTerm') && (
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <CoreDatePicker
              control={control}
              name='dueDate'
              title='Ngày đến hạn'
              placeholder='Chọn ngày đến hạn'
              format='YYYY-MM-DD'
              minDate={watch('date')}
            />
          </Grid>
        )}

        {!watch('dueDate') && (
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <CoreAutoCompleteAPI
              control={control}
              name='paymentTerm'
              label='Điều khoản thanh toán'
              placeholder='Chọn điều khoản thanh toán'
              fetchDataFn={getPaymentTermList}
              params={{
                type:
                  typeCustomerOrProvider === 'PROVIDER' ? 'PURCHASE' : 'SALE',
              }}
            />
          </Grid>
        )}

        <Grid item xs={12} sm={12} md={4} lg={4}>
          <CoreDatePicker
            control={control}
            name='accountingDate'
            title='Ngày hạch toán'
            placeholder='Chọn ngày'
            format='YYYY-MM-DD'
            minDate={watch('date')}
          />
        </Grid>

        {typeCustomerOrProvider === 'PROVIDER' && (
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <CoreAutoCompleteAPI
              control={control}
              name='deliveryAddress'
              label='Địa chỉ giao hàng'
              placeholder='Chọn địa chỉ giao hàng'
              labelPath='address'
              labelPathForAddress={true}
              valuePath='id'
              required
              rules={{
                required: t('common:validation.required'),
              }}
              fetchDataFn={getAddressList}
            />
          </Grid>
        )}

        {/* UI CUSTOMER chọn xuất kho */}
        {watch('isWithDeliveryNote') && (
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <CoreAutocomplete
              label='Loại kho'
              control={control}
              name={`warehouseType`}
              options={warehouseType}
              required
              rules={{
                required: t('common:validation.required'),
              }}
              onChangeValue={(val) => {
                if (val) {
                  setValue('warehouse', null)
                }
              }}
            />
          </Grid>
        )}

        {watch('warehouseType') && (
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <CoreAutoCompleteAPI
              control={control}
              isViewProp={actionType === 'VIEW'}
              params={{
                warehouseType: watch(`warehouseType`),
              }}
              name='warehouse'
              label='Kho'
              // multiple
              labelPath='name'
              valuePath='id'
              placeholder='Chọn kho'
              fetchDataFn={getListWarehouse}
              required
              rules={{
                required: t('common:validation.required'),
              }}
            />
          </Grid>
        )}

        {typeCustomerOrProvider !== 'PROVIDER' && (
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <CoreAutocomplete
              control={control}
              label='Hình thức thanh toán'
              placeholder='Chọn hình thức thanh toán'
              isViewProp={actionType === 'VIEW'}
              name='paymentMethod'
              required
              rules={{
                required: t('common:validation.required'),
              }}
              options={paymentMethodSelect}
            />
          </Grid>
        )}

        {watch('paymentMethod') === 'BANK' && (
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <div className='flex flex-col gap-2'>
              <CoreAutoCompleteAPI
                control={control}
                name='bankAccountPartner'
                label={'STK Khách hàng'}
                labelPath='accountNumber'
                labelPath2='bank'
                placeholder=''
                params={{
                  partnerOrBranchId: watch('partner')?.id,
                  isPartner: typeInvoice === 'INTERNAL' ? false : true,
                }}
                // required
                // rules={{
                //   required: t('common:validation.required'),
                // }}
                disabled={!watch('partner')?.id}
                fetchDataFn={getBankAccountByPartnerList}
              />

              {!isView && !!watch('partner.id') && renderAddSTKPartner()}

              {isOpenDialogSTKPartner && !!watch('partner.id') && (
                <DialogAddSTKBank
                  isPartner={typeInvoice === 'INTERNAL' ? false : true}
                  idPartner={watch('partner.id')}
                  type='PARTNER'
                  refetch={async () => {
                    await getBankAccountByPartnerList({
                      isPartner: typeInvoice === 'INTERNAL' ? false : true,
                    })
                  }}
                  onCloseDialog={() => setIsOpenDialogSTKPartner(false)}
                  setValue={methodForm.setValue}
                  name='bankAccountPartner'
                />
              )}
            </div>
          </Grid>
        )}

        {watch('paymentMethod') === 'BANK' && (
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <div className='flex flex-col gap-2'>
              <CoreAutoCompleteAPI
                control={control}
                name='bankAccount'
                label={'STK Công ty'}
                placeholder=''
                required
                rules={{
                  required: t('common:validation.required'),
                }}
                labelPath='accountNumber'
                labelPath2='bank'
                fetchDataFn={getBankOfCompanyList}
              />

              {!isView && renderAddSTK()}

              {isOpenDialogSTK && (
                <DialogAddSTKBank
                  type='COMMON'
                  refetch={() => {}}
                  onCloseDialog={() => setIsOpenDialogSTK(false)}
                  setValue={methodForm.setValue}
                  name='bankAccount'
                />
              )}
            </div>
          </Grid>
        )}

        {watch('isTakePricePolicy') &&
          !(watch('saleType') === 'OEM') &&
          !(typeInvoice === 'OEM') &&
          !(typeInvoice === 'LIQUIDATION') && (
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <CoreAutoCompleteAPI
                control={control}
                label={`${
                  watch('saleType') === 'MERCHANT' || typeInvoice === 'MERCHANT'
                    ? 'Chính sách bảng giá'
                    : 'Bảng giá'
                }`}
                placeholder={`${
                  watch('saleType') === 'MERCHANT' || typeInvoice === 'MERCHANT'
                    ? 'Chọn chính sách bảng giá'
                    : 'Chọn bảng giá'
                }`}
                isViewProp={actionType === 'VIEW'}
                name='priceList'
                params={{
                  currencyId: currencyId,
                  typePath: type,
                }}
                fetchDataFn={getPriceListByCurrencyNew}
                onChangeValue={(val) => {
                  setValue('invoiceLines', [
                    {
                      unitPrice: 0,
                      uom: null,
                      product: null,
                      discount: 0,
                      quantity: 0,
                      discountAmount: 0,
                      amountTotal: 0,
                      amountUntaxed: 0,
                      lineTax: 0,
                      importTax: 0,
                      specialConsumptionTax: 0,
                      environmentalResourceTax: 0,
                      vat: 0,
                    } as any,
                  ])
                  setValue(`invoiceLines.${0}.amountUntaxed`, 0)
                  setValue(`invoiceLines.${0}.quantity`, 0)
                  setValue(`invoiceLines.${0}.unitPrice`, 0)
                  setValue(`invoiceLines.${0}.taxes`, [])
                  setValue('moveLines', [])
                }}
              />
            </Grid>
          )}

        {codeLedger === 'SC00' && (
          <Grid item xs={12} sx={{ marginBottom: '10px' }}>
            <CoreCheckbox
              name='isAnotherBook'
              control={control}
              label='Sổ khác'
            />
          </Grid>
        )}

        {(watch('isAnotherBook') === true &&
          codeLedger === 'SC00' &&
          watch('state') === 'POSTED' &&
          watch('isCreateAnotherBook') === true) ||
        (watch('isAnotherBook') === true && !isView) ? (
          <RenderAnotherBook
            actionType={actionType}
            append={appendLedgerRefs}
            remove={removeLedgerRefs}
            control={control}
            fieldLedgerRefs={fieldLedgerRefs}
            watch={watch}
          />
        ) : null}

        <Grid item xs={12} sm={12}>
          <div className='flex gap-1 items-center mt-5'>
            <Typography variant='h6'>Thông tin hàng hóa/dịch vụ</Typography>
          </div>
        </Grid>
        <Grid
          item
          xs={12}
          style={{
            marginBottom: '15px',
          }}
        >
          <TableCustomDnd
            setValue={setValue}
            watch={watch}
            fieldsName='invoiceLines'
            columns={invoiceColumns}
            data={invoiceLinesTableData}
            isShowColumnStt
            actionTable={
              watch('state') === 'DRAFT' && !watch('orderName') && !isView ? (
                <ActionTable
                  columns={invoiceColumns}
                  append={appendInvoiceLines}
                  defaultValueLine={{
                    uom: null,
                    product: null,
                    discount: 0,
                    discountAmount: 0,
                    amountTotal: 0,
                    amountUntaxed: 0,
                    lineTax: 0,
                    importTax: 0,
                    specialConsumptionTax: 0,
                    environmentalResourceTax: 0,
                    vat: 0,
                    taxes: [],
                  }}
                />
              ) : null
            }
          />
        </Grid>

        <InvoicePaymentInfo isUpdate={isUpdate} refetch={refetch} data={data} />
      </Grid>
    </>
  )
}

export default DetailTab
