import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import { CoreButton } from '@/components/atoms/CoreButton'
import CoreCheckbox from '@/components/atoms/CoreCheckbox'
import { CoreDatePicker } from '@/components/atoms/CoreDatePicker'
import CoreInput from '@/components/atoms/CoreInput'
import { SelectBoxCustomV2 } from '@/components/atoms/SelectBoxCustomV2'
import { Action } from '@/components/molecules/Action'
import CoreLoading from '@/components/molecules/CoreLoading'
import { TopAction } from '@/components/molecules/TopAction'
import CoreNavbar from '@/components/organism/CoreNavbar'
import PageContainer from '@/components/organism/PageContainer'
import { TableCustomDnd } from '@/components/organism/TableCustomDnd'
import { ActionTable } from '@/components/organism/TableCustomDnd/ActionTable'
import { inboundInvoice, outboundInvoice, partnerType, state } from '@/enum'
import { PRIMARY } from '@/helper/colors'
import { useAppSelector } from '@/redux/hook'
import { MENU_URL } from '@/routes'
import { getAccountJournalList } from '@/service/accounting/accountJournal/getList'
import { getAccountLedger } from '@/service/accounting/accountLedger/getList'
import {
  getIncomeList,
  getListObjectCurrency,
} from '@/service/accounting/accountMove/getListIncome'
import { getBranchList } from '@/service/common/branch/getList'
import { getBankOfCompanyList } from '@/service/common/company/getListBank'
import { getCurrencyOfCompany } from '@/service/common/company/getListCurrency/index'
import { getEmployeeList } from '@/service/common/employee/getList'
import { getBankAccountByPartnerList } from '@/service/common/partner/getListBankAccountByPartner'
import { getPartnerList } from '@/service/common/partner/getListTiny'
import { Grid, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { FormProvider } from 'react-hook-form'
import DialogConfirmDraft from '../../Dialog/DialogConfirmDraft'
import DialogDeletePayment from '../../Dialog/DialogDeletePayment'
import DialogHisUpdateList from '../../Dialog/DialogHistoryEditBound'
import { DialogAddSTKBank } from '../DialogAddSTKBank'
import useSaveBankAndCashAccount from './useSaveBankAndCashAccount'

const SaveBankAndCashAccount = () => {
  const [values, handles] = useSaveBankAndCashAccount()

  const {
    id,
    code,
    isUpdate,
    isView,
    isLoading,
    isLoadingSubmit,
    incomeExpenseColumns,
    fields,
    idLedger,
    paymentType,
    paymentMethod,
    paymentMethodURL,
    methodForm,
    columns,
    tableData,
  } = values

  const {
    t,
    onCancel,
    onSubmit,
    onDraftSubmit,
    refetch,
    append,
    remove,
    showDialog,
    paymentEntryAppend,
  } = handles

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

  const { control, watch, setValue, trigger, clearErrors } = methodForm
  const [isOpenDialogSTK, setIsOpenDialogSTK] = useState(false)
  const router = useRouter()
  const { actionType } = router.query

  const renderAnotherBook = () => {
    return fields?.map((item: any, index: number) => {
      return (
        <Grid key={item?.id} item xs={12}>
          <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <CoreAutoCompleteAPI
                control={control}
                name={`ledgerRefs.${index}.accountLedger`}
                label='Sổ cái'
                placeholder='Chọn sổ cái'
                className='w-full'
                rules={{ required: t('common:validation.required') }}
                fetchDataFn={getAccountLedger}
                params={{
                  accountLedgerNowId: idLedger,
                }}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={4} lg={4}>
              <CoreAutoCompleteAPI
                control={control}
                name={`ledgerRefs.${index}.accountJournal`}
                label='Sổ kế toán'
                className='w-full'
                placeholder='Chọn sổ kế toán'
                fetchDataFn={getAccountJournalList}
                params={{
                  accountLedgerId: watch(`ledgerRefs.${index}.accountLedger`)
                    ?.id,
                }}
                disabled={!watch(`ledgerRefs.${index}.accountLedger`)}
              />
            </Grid>
            {actionType !== 'VIEW' && (
              <Grid item xs={1}>
                <div className='flex justify-center items-center mt-5'>
                  <Action
                    actionList={index === 0 ? ['append'] : ['append', 'remove']}
                    onAppendAction={() => {
                      append({
                        accountLedger: null,
                        accountJournal: null,
                      })
                    }}
                    onRemoveAction={() => {
                      remove(index)
                    }}
                  />
                </div>
              </Grid>
            )}
          </Grid>
        </Grid>
      )
    })
  }

  const getLabel = () => {
    const title =
      paymentType === 'INBOUND'
        ? inboundInvoice.find((ele) => ele.value === watch('type'))?.label ?? ''
        : outboundInvoice.find((ele) => ele.value === watch('type'))?.label ??
          ''

    return title + ' - ' + (watch('partner')?.name ?? '')
  }

  const { id: branchNowId } = useAppSelector((state) => state.branchData)
  const { id: companyId } = useAppSelector((state) => state.companyConfigData)

  return (
    <PageContainer
      title={
        <div className='flex justify-between items-center'>
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
                title: !!id ? code : t('common:btn.add'),
              },
            ]}
          />

          <CoreBreadcrumbs
            breadcrumbs={state.map((ele, index) => ({
              title: (
                <Typography
                  sx={{
                    color: watch('state') === ele.value ? PRIMARY : undefined,
                  }}
                >
                  {`${index + 1}. ${ele.label}`}
                </Typography>
              ),
            }))}
          />
        </div>
      }
    >
      <CoreNavbar
        breadcrumbs={[
          {
            title: 'Chi tiết',
            rightAction: (
              <TopAction
                actionList={
                  [
                    ...(isUpdate ? ['history'] : []),
                    ...(watch('state') === 'POSTED' ? ['draft', 'print'] : []),
                    ...(isView && watch('state') === 'DRAFT' ? ['edit'] : []),
                    ...(isUpdate && watch('state') === 'DRAFT'
                      ? ['delete']
                      : []),
                  ] as any
                }
                onPrintAction={() => {
                  if (id)
                    router.push({
                      pathname: `${MENU_URL[paymentMethodURL][paymentType]}/[id]/print`,
                      query: {
                        id,
                        code,
                      },
                    })
                }}
                onHistoryAction={() => {
                  showDialog(
                    <DialogHisUpdateList
                      code={watch('code')}
                      changeId={Number(id)}
                      historyType='PAYMENT'
                      refetch={() => {}}
                    />
                  )
                }}
                onDeleteAction={() => {
                  showDialog(
                    <DialogDeletePayment
                      id={Number(id)}
                      refetch={() => {
                        router.push({
                          pathname: MENU_URL[paymentMethodURL][paymentType],
                        })
                      }}
                    />
                  )
                }}
                onDraftAction={() => {
                  showDialog(
                    <DialogConfirmDraft
                      id={Number(id)}
                      type='PAYMENT'
                      refetch={refetch}
                    />
                  )
                }}
                onEditAction={() => {
                  router.push({
                    pathname: `${MENU_URL[paymentMethodURL][paymentType]}/[id]`,
                    query: {
                      id,
                    },
                  })
                }}
              ></TopAction>
            ),
            content: isLoading ? (
              <div className='flex justify-center items-center h-full min-h-[600px]'>
                <CoreLoading />
              </div>
            ) : (
              <FormProvider {...methodForm}>
                <form className='flex flex-col' onSubmit={onSubmit}>
                  <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                      <CoreAutocomplete
                        control={control}
                        name='type'
                        label={
                          paymentType === 'INBOUND'
                            ? 'Loại phiếu thu'
                            : 'Loại phiếu chi'
                        }
                        options={
                          paymentType === 'INBOUND'
                            ? inboundInvoice
                            : outboundInvoice
                        }
                        onChangeValue={() => {
                          setValue('partner', null)
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                      <CoreInput
                        control={control}
                        name='code'
                        label={`Số phiếu${
                          paymentType === 'INBOUND' ? ' thu' : ' chi'
                        }`}
                        placeholder={`Nhập số phiếu ${
                          paymentType === 'INBOUND' ? ' thu' : ' chi'
                        }`}
                        inputProps={{ maxLength: 50 }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={12} md={4} lg={4}>
                      <CoreDatePicker
                        control={control}
                        name='paymentDate'
                        title='Ngày lập chứng từ'
                        placeholder='Chọn ngày lập chứng từ'
                        format='YYYY-MM-DD'
                        required
                        rules={{ required: t('common:validation.required') }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={12} md={4} lg={4}>
                      <CoreDatePicker
                        control={control}
                        name='accountingDate'
                        title='Ngày hạch toán'
                        placeholder='Chọn ngày hạch toán'
                        format='YYYY-MM-DD'
                        minDate={watch('paymentDate')}
                      />
                    </Grid>

                    <Grid item xs={12} sm={12} md={4} lg={4}>
                      <CoreAutoCompleteAPI
                        control={control}
                        name='accountJournal'
                        label='Sổ kế toán'
                        placeholder='Chọn sổ kế toán'
                        required
                        fetchDataFn={getAccountJournalList}
                        params={{
                          type: paymentMethod,
                          accountLedgerId: idLedger,
                        }}
                        rules={{ required: t('common:validation.required') }}
                        onChangeValue={(val) => {
                          if (val) {
                            setValue('paymentMethod', val.type)
                          }
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={12} md={4} lg={4}>
                      <CoreAutoCompleteAPI
                        control={control}
                        name='currency'
                        label={'Đơn vị tiền tệ'}
                        placeholder='Chọn đơn vị tiền tệ'
                        fetchDataFn={getCurrencyOfCompany}
                        required
                        rules={{
                          required: t('common:validation.required'),
                        }}
                        disableClearable
                        onChangeValue={(val) => {
                          setValue('paymentEntry', [
                            {
                              label: '',
                              accountCredit: null,
                              accountDebit: null,
                              amount: 0,
                              manufactures: [],
                            },
                          ] as any)
                        }}
                      />
                    </Grid>

                    {watch('type') !== 'STAFF' && (
                      <Grid item xs={12} sm={12} md={4} lg={4}>
                        <CoreAutocomplete
                          control={control}
                          name='partnerType'
                          label='Loại đối tác'
                          placeholder='Chọn loại đối tác'
                          options={partnerType}
                          onChangeValue={() => {
                            setValue('partner', null)
                          }}
                        />
                      </Grid>
                    )}

                    <Grid item xs={12} sm={12} md={4} lg={4}>
                      <CoreAutoCompleteAPI
                        control={control}
                        name='partner'
                        label={
                          watch('type') === 'STAFF' ? 'Nhân viên' : 'Đối tác'
                        }
                        rules={{ required: t('common:validation.required') }}
                        placeholder='Chọn đối tác'
                        required
                        fetchDataFn={
                          watch('type') === 'STAFF'
                            ? getEmployeeList
                            : watch('partnerType') === 'INTERNAL'
                            ? getBranchList
                            : getPartnerList
                        }
                        labelPath='name'
                        labelPath2='code'
                        params={
                          watch('type') === 'STAFF'
                            ? { activated: true }
                            : watch('partnerType') === 'INTERNAL'
                            ? {
                                branchNowId: branchNowId ?? companyId,
                                isDefaultCompany: true,
                                activated: true,
                              }
                            : {
                                isVendor:
                                  watch('partnerType') === 'VENDOR'
                                    ? true
                                    : null,
                                vendorActivated:
                                  watch('partnerType') === 'VENDOR'
                                    ? true
                                    : null,
                                isCustomer:
                                  watch('partnerType') === 'CUSTOMER'
                                    ? true
                                    : null,
                                activated:
                                  watch('partnerType') === 'CUSTOMER'
                                    ? true
                                    : null,
                              }
                        }
                      />
                    </Grid>

                    {paymentMethod === 'BANK' && (
                      <Grid item xs={12} sm={12} md={4} lg={4}>
                        <div className='flex flex-col gap-2'>
                          <CoreAutoCompleteAPI
                            control={control}
                            name='bankAccountPartner'
                            label={
                              paymentType === 'INBOUND'
                                ? 'STK gửi tiền'
                                : 'STK nhận tiền'
                            }
                            labelPath='accountNumber'
                            labelPath2='bank'
                            placeholder=''
                            params={{
                              partnerOrBranchId: watch('partner')?.id,
                              isPartner: true,
                            }}
                            // required
                            // rules={{
                            //   required: t('common:validation.required'),
                            // }}
                            disabled={!watch('partner')?.id}
                            fetchDataFn={getBankAccountByPartnerList}
                          />

                          {/* {!isView && renderAddSTK()}

                        {isOpenDialogSTK && (
                          <DialogAddSTKBank
                            refetch={() => {}}
                            onCloseDialog={() => setIsOpenDialogSTK(false)}
                            setValue={methodForm.setValue}
                            name='bankAccountPartner'
                          />
                        )} */}
                        </div>
                      </Grid>
                    )}

                    {paymentMethod === 'BANK' && (
                      <Grid item xs={12} sm={12} md={4} lg={4}>
                        <div className='flex flex-col gap-2'>
                          <CoreAutoCompleteAPI
                            control={control}
                            name='bankAccount'
                            label={
                              paymentType === 'INBOUND'
                                ? 'STK nhận tiền'
                                : 'STK gửi tiền'
                            }
                            placeholder=''
                            required
                            rules={{
                              required: t('common:validation.required'),
                            }}
                            labelPath='accountNumber'
                            labelPath2='bank'
                            fetchDataFn={getBankOfCompanyList}
                            params={{
                              render: watch('bankAccount')?.id,
                            }}
                          />

                          {!isView && renderAddSTK()}

                          {isOpenDialogSTK && (
                            <DialogAddSTKBank
                              refetch={() => {
                                watch('bankAccount')?.id &&
                                  clearErrors('bankAccount')
                              }}
                              onCloseDialog={() => setIsOpenDialogSTK(false)}
                              setValue={methodForm.setValue}
                              name='bankAccount'
                            />
                          )}
                        </div>
                      </Grid>
                    )}

                    <Grid item xs={12} sm={12} md={4} lg={4}>
                      {paymentType === 'INBOUND' ? (
                        <SelectBoxCustomV2
                          control={control}
                          name='incomeExpense'
                          columns={incomeExpenseColumns}
                          labelPath='name'
                          valuePath='id'
                          fetchDataFn={getListObjectCurrency}
                          className='w-full'
                          label='Đối tượng thu'
                          placeholder='Chọn đối tượng thu'
                        />
                      ) : (
                        <SelectBoxCustomV2
                          control={control}
                          name='incomeExpense'
                          columns={incomeExpenseColumns}
                          labelPath='name'
                          valuePath='id'
                          fetchDataFn={getIncomeList}
                          className='w-full'
                          label='Đối tượng chi'
                          placeholder='Chọn đối tượng chi'
                        />
                      )}
                    </Grid>

                    <Grid item xs={12}>
                      <CoreCheckbox
                        name='isAnotherBook'
                        control={control}
                        label='Sổ khác'
                      />
                    </Grid>

                    {(watch('isAnotherBook') === true &&
                      watch('state') === 'POSTED' &&
                      watch('isCreateAnotherBook') === true) ||
                    (watch('isAnotherBook') === true &&
                      actionType !== 'VIEW') ? (
                      <>{renderAnotherBook()}</>
                    ) : null}
                  </Grid>

                  <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={12}>
                      <TableCustomDnd
                        className='mt-15'
                        columns={columns}
                        data={tableData}
                        paginationHidden={false}
                        fieldsName={'paymentEntry'}
                        actionTable={
                          isView ? null : (
                            <ActionTable
                              action='Thêm dòng'
                              columns={columns}
                              defaultValueLine={{
                                label: getLabel(),
                                accountCredit: null,
                                accountDebit: null,
                                amount: 0,
                              }}
                              append={paymentEntryAppend}
                            />
                          )
                        }
                        isShowColumnStt
                      />
                    </Grid>
                  </Grid>
                  {watch('state') === 'DRAFT' && actionType !== 'VIEW' && (
                    <div className='space-x-12 text-center my-15'>
                      <CoreButton theme='cancel' onClick={onCancel}>
                        {t('common:btn.cancel')}
                      </CoreButton>
                      <CoreButton
                        theme='draft'
                        onClick={onDraftSubmit}
                        loading={isLoadingSubmit}
                      >
                        {t('common:btn.draft')}
                      </CoreButton>
                      <CoreButton
                        theme='submit'
                        type='submit'
                        loading={isLoadingSubmit}
                      >
                        {isUpdate
                          ? t('common:btn.save_change')
                          : t('common:btn.add')}
                      </CoreButton>
                    </div>
                  )}
                </form>
              </FormProvider>
            ),
          },
        ]}
      />
    </PageContainer>
  )
}

export default SaveBankAndCashAccount
