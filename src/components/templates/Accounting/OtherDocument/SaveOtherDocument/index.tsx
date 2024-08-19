import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import { CoreButton } from '@/components/atoms/CoreButton'
import CoreCheckbox from '@/components/atoms/CoreCheckbox'
import { CoreDatePicker } from '@/components/atoms/CoreDatePicker'
import CoreInput from '@/components/atoms/CoreInput'
import { SelectBoxCustomV2 } from '@/components/atoms/SelectBoxCustomV2'
import CoreLoading from '@/components/molecules/CoreLoading'
import CoreNavbar from '@/components/organism/CoreNavbar'
import { CoreTable } from '@/components/organism/CoreTable'
import PageContainer from '@/components/organism/PageContainer'
import { TableCustomDnd } from '@/components/organism/TableCustomDnd'
import { ActionTable } from '@/components/organism/TableCustomDnd/ActionTable'
import { documentType } from '@/enum'
import { MENU_URL } from '@/routes'
import { getIncomeList } from '@/service/accounting/accountMove/getListIncome'
import { getDateNow } from '@/utils/date/date'
import { Grid, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useId } from 'react'
import { FormProvider } from 'react-hook-form'
import { RightAction } from './RightAction'
import useSaveOtherDocument from './useSaveOtherDocument'

const SaveOtherDocument = () => {
  const [values, handles] = useSaveOtherDocument()

  const {
    id,
    code,
    isUpdate,
    tableData,
    isView,
    isLoading,
    incomeExpenseColumns,
    methodForm,
    columns,
    isLoadingSubmit,
    columns2,
    tableData2,
  } = values

  const {
    t,
    onCancel,
    onSubmit,
    remove,
    append,
    refetch,
    showDialog,
    append2,
  } = handles

  const key = useId()

  const {
    control,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = methodForm

  const [entryListWatch, invoiceTaxesWatch] = watch([
    'entryList',
    'invoiceTaxes',
  ])

  const router = useRouter()
  const { actionType } = router.query

  return (
    <PageContainer
      title={
        <div className='flex justify-between items-center'>
          <CoreBreadcrumbs
            isShowDashboard
            breadcrumbs={[
              {
                title: t('title'),
                pathname: MENU_URL.GENERAL_ACC.OTHER_DOC,
              },

              {
                title: (
                  <Typography>{!!id ? code : t('common:btn.add')}</Typography>
                ),
              },
            ]}
          />

          <div></div>
        </div>
      }
    >
      <CoreNavbar
        breadcrumbs={[
          {
            title: 'Chi tiết',
            rightAction: <RightAction isUpdate={isUpdate} id={Number(id)} />,
            checkChangeToTabFn: () => trigger('invoiceTaxes'),
            isCheckChangeToTab: !errors?.invoiceTaxes,
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
                        name='documentType'
                        label={'Loại chứng từ'}
                        options={documentType}
                        required
                        placeholder='Chọn loại chứng từ'
                        disableClearable
                        onChangeValue={(val) => {
                          setValue('isWithInvoice', false)
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={12} md={4} lg={4}>
                      <CoreInput
                        control={control}
                        name='code'
                        label='Số chứng từ'
                        placeholder='Nhập số chứng từ'
                        inputProps={{ maxLength: 50 }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={12} md={4} lg={4}>
                      <CoreDatePicker
                        control={control}
                        name='date'
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
                        minDate={watch('date')}
                      />
                    </Grid>

                    <Grid item xs={12} sm={12} md={4} lg={4}>
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
                    </Grid>

                    {watch('documentType') === 'OTHER' && (
                      <Grid item xs={12}>
                        <CoreCheckbox
                          control={control}
                          name='isWithInvoice'
                          label='Kèm hóa đơn và thuế'
                          onChangeValue={(val: boolean) => {
                            if (
                              entryListWatch.length !== invoiceTaxesWatch.length
                            ) {
                              entryListWatch.map((value, index) => {
                                setValue(
                                  `invoiceTaxes.${index}.amountUntaxed`,
                                  value?.amount
                                )
                              })
                            }
                          }}
                        />
                      </Grid>
                    )}
                  </Grid>

                  <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={12}>
                      <TableCustomDnd
                        key={key}
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
                                label: 'Nội dung',
                                accountCredit: null,
                                accountDebit: null,
                                amount: 0,
                              }}
                              append={append}
                              handleAppend={() => {
                                append2({
                                  taxType: 'INPUT_TAX_INCREASE',
                                  numberInvoice: '',
                                  date: getDateNow(),
                                } as any)
                              }}
                            />
                          )
                        }
                        isShowColumnStt
                      />
                    </Grid>
                  </Grid>

                  {actionType !== 'VIEW' && (
                    <div className='space-x-12 text-center my-15'>
                      <CoreButton theme='cancel' onClick={onCancel}>
                        {t('common:btn.cancel')}
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
          ...(watch('isWithInvoice')
            ? [
                {
                  title: 'Hóa đơn',
                  rightAction: (
                    <RightAction isUpdate={isUpdate} id={Number(id)} />
                  ),
                  content: (
                    <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
                      <Grid item xs={12}>
                        <CoreTable
                          className='mt-15'
                          columns={columns2}
                          data={tableData2}
                          paginationHidden
                          isShowColumnStt
                        />
                      </Grid>
                    </Grid>
                  ),
                },
              ]
            : []),
        ]}
      />
    </PageContainer>
  )
}

export default SaveOtherDocument
