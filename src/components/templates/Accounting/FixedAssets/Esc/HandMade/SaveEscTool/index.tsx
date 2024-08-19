import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import { CoreButton } from '@/components/atoms/CoreButton'
import CoreCheckbox from '@/components/atoms/CoreCheckbox'
import { CoreDatePicker } from '@/components/atoms/CoreDatePicker'
import CoreInput from '@/components/atoms/CoreInput'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import { TopAction } from '@/components/molecules/TopAction'
import PageWithDetail from '@/components/organism/PageWithDetail'
import { TableCustomDnd } from '@/components/organism/TableCustomDnd'
import { ActionTable } from '@/components/organism/TableCustomDnd/ActionTable'
import DialogDeleteToolEscHM from '@/components/templates/Accounting/Dialog/DialogDeleteToolEscHandMade'
import { errorMsg, successMsg } from '@/helper/message'
import { MENU_URL } from '@/routes'
import { getAccountList } from '@/service/accounting/account/getList'
import { getCalculator } from '@/service/accounting/increaseTools/calculatorIncreaseTool'
import { checkDiscontinueAllocation } from '@/service/accounting/increaseTools/checkDiscontinueAllocation'
import { getToolsAssetList } from '@/service/accounting/toolsAssetCategory/getList'
import { getProductList2 } from '@/service/product/productController/getListProForToolsAsset'
import { Grid, Typography } from '@mui/material'
import { debounce } from 'lodash'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import MyCollapse from '../../../../V1/AccountConfig/MyCollapse'
import useSaveEscAssets from './useSaveEscTool'
const SaveEscTool = () => {
  const { t } = useTranslation('accounting/cash-account')

  const [values, handles] = useSaveEscAssets()

  const {
    accountLedgerId,
    isUpdate,
    actionType,
    methodForm,
    id,
    isLoadingSubmit,
    currencyId,
    fields,
    tableDataSaveEscTool,
    currency,
    columnSaveEscTool,
    dataAccConfig,
    typeAddNewRouter,
    pathRedirect,
  } = values

  const {
    handleParamsToolsAsset,
    onCancel,
    onSubmit,
    refetch,
    rmLinesSaveTool,
    apLinesTool,
  } = handles
  const { control, getValues, watch, setValue, setError } = methodForm

  const { showDialog } = useDialog()
  const router = useRouter()

  return (
    <PageWithDetail
      title={
        <div className='flex justify-between items-center'>
          <div className='flex'>
            <CoreBreadcrumbs
              isShowDashboard
              breadcrumbs={[
                {
                  title: 'CCDC',
                  pathname: `${MENU_URL.TOOL.ESC}`,
                },
                {
                  title: (
                    <Typography>
                      {isUpdate
                        ? actionType === 'VIEW'
                          ? 'Chi tiết'
                          : 'Chỉnh sửa'
                        : t('common:btn.add')}
                    </Typography>
                  ),
                },
              ]}
            />
          </div>
        </div>
      }
      topAction={
        <div className='bg-white flex justify-between w-full items-center'>
          <div></div>
          {!router.asPath.includes('/addNew') ? (
            actionType === 'VIEW' ? (
              watch('isExistDepreciation') ? (
                <></>
              ) : (
                <TopAction
                  actionList={['edit', 'delete']}
                  onEditAction={() => {
                    router.replace({
                      pathname: `${MENU_URL.TOOL.ESC}/handMade/[id]`,
                      query: {
                        id,
                        typeAddNew: typeAddNewRouter,
                      },
                    })
                  }}
                  onDeleteAction={() => {
                    showDialog(
                      <DialogDeleteToolEscHM
                        id={id}
                        refetch={() => {
                          router.push({
                            pathname: MENU_URL.TOOL.ESC,
                          })
                        }}
                      />
                    )
                  }}
                />
              )
            ) : watch('isExistDepreciation') ? (
              <TopAction
                actionList={['edit', 'delete']}
                onEditAction={() => {
                  router.replace({
                    pathname: `${MENU_URL.TOOL.ESC}/handMade/[id]`,
                    query: {
                      id,
                      typeAddNew: typeAddNewRouter,
                    },
                  })
                }}
                onDeleteAction={() => {
                  showDialog(
                    <DialogDeleteToolEscHM
                      id={id}
                      refetch={() => {
                        router.push({
                          pathname: MENU_URL.TOOL.ESC,
                        })
                      }}
                    />
                  )
                }}
              />
            ) : (
              <TopAction
                actionList={['edit', 'delete']}
                onEditAction={() => {
                  router.replace({
                    pathname: `${MENU_URL.TOOL.ESC}/handMade/[id]`,
                    query: {
                      id,
                    },
                  })
                }}
                onDeleteAction={() => {
                  showDialog(
                    <DialogDeleteToolEscHM
                      id={id}
                      refetch={() => {
                        router.push({
                          pathname: MENU_URL.TOOL.ESC,
                        })
                      }}
                    />
                  )
                }}
              />
            )
          ) : (
            <></>
          )}
        </div>
      }
    >
      <div className='w-full flex flex-col'>
        <form className='bg-[#ffffff] ' onSubmit={onSubmit}>
          <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid
              item
              xs={12}
              sm={12}
              md={4}
              lg={4}
              style={{
                marginBottom: '15px',
              }}
            >
              <CoreInput
                control={control}
                name='code'
                label='Mã ghi tăng'
                placeholder='Nhập mã ghi tăng'
                // required
                // rules={{
                //   required: t('common:validation.required'),
                // }}
              />
            </Grid>

            <Grid
              item
              xs={12}
              sm={12}
              md={4}
              lg={4}
              style={{
                marginBottom: '15px',
              }}
            >
              <CoreDatePicker
                control={control}
                name='increaseRecordDate'
                title='Ngày ghi tăng'
                placeholder='Chọn ngày ghi tăng'
                required
                format='YYYY-MM-DD'
                rules={{
                  required: t('common:validation.required'),
                }}
              />
            </Grid>

            <Grid
              item
              xs={12}
              sm={12}
              md={4}
              lg={4}
              style={{
                marginBottom: '15px',
              }}
            >
              <CoreAutoCompleteAPI
                isViewProp={watch('typeAddNew') !== 'HANDMADE' || isUpdate}
                label='Mã CCDC'
                control={control}
                name='product'
                params={{
                  isGood: true,
                }}
                required
                rules={{
                  required: t('common:validation.required'),
                }}
                labelPath='sku'
                fetchDataFn={getProductList2}
                placeholder='Chọn mã ghi tăng'
                onChangeValue={(value) => {
                  if (value) {
                    setValue('product.name', value?.name)
                    setValue('product.code', value?.code)
                    setValue('product.id', value?.id)
                    setValue('unit.name', value?.uomName)
                    setValue('unit.code', value?.sku)
                    setValue('unit.id', value?.uomId)
                  } else {
                    setValue('product.name', '')
                    setValue('product.code', '')
                    setValue('product.id', null)
                    setValue('unit.name', '')
                    setValue('unit.code', '')
                    setValue('unit.id', null)
                  }
                }}
              />
            </Grid>

            <Grid
              item
              xs={12}
              sm={12}
              md={4}
              lg={4}
              style={{
                marginBottom: '15px',
              }}
            >
              <CoreInput
                control={control}
                name='product.name'
                label='Tên CCDC'
                placeholder='Nhập tên CCDC'
                required
                rules={{
                  required: t('common:validation.required'),
                }}
              />
            </Grid>

            <Grid
              item
              xs={12}
              sm={12}
              md={4}
              lg={4}
              style={{
                marginBottom: '15px',
              }}
            >
              <CoreAutoCompleteAPI
                control={control}
                name='category'
                label='Loại CCDC'
                params={{
                  categoryType: 'TOOLS',
                  accountLedgerId: accountLedgerId,
                }}
                fetchDataFn={getToolsAssetList}
                placeholder='Chọn loại CCDC'
                onChangeValue={debounce((val) => {
                  if (val) {
                    setValue('waitingAllocation', val?.originalAccount)
                  } else {
                    setValue('waitingAllocation', null)
                  }
                }, 1500)}
              />
            </Grid>

            <Grid
              item
              xs={12}
              sm={12}
              md={4}
              lg={4}
              style={{
                marginBottom: '15px',
              }}
            >
              <CoreInput
                control={control}
                InputProps={{
                  length: 255,
                }}
                name='reason'
                label='Lý do ghi tăng'
                placeholder='Nhập lý do ghi tăng'
              />
            </Grid>

            <Grid
              item
              xs={12}
              sm={12}
              md={4}
              lg={4}
              style={{
                marginBottom: '15px',
              }}
            >
              <CoreInput
                control={control}
                name='unit.name'
                label='Đơn vị tính'
                isViewProp={true}
              />
            </Grid>

            <Grid
              item
              xs={12}
              sm={12}
              md={4}
              lg={4}
              style={{
                marginBottom: '15px',
              }}
            >
              <CoreInput
                isViewProp={watch('typeAddNew') !== 'HANDMADE' || isUpdate}
                control={control}
                name='quantity'
                label='Số lượng ghi tăng'
                placeholder='Nhập số lượng ghi tăng'
                required
                type='number'
                rules={{
                  validate: (val: number) => {
                    if (val < 0 && watch('quantity') < 0)
                      return 'Số lượng ghi không hợp lệ'
                  },
                  required: t('common:validation.required'),
                }}
                // onChangeValue={async (value) => {
                //   if (
                //     value &&
                //     value > 0 &&
                //     Number(watch('unitPrice')) > 0 &&
                //     Number(watch('numberOfAllocationPeriods')) > 0
                //   ) {
                //     setValue(
                //       'recordedValue',
                //       value * Number(watch('unitPrice'))
                //     )
                //     const res = await getCalculator({
                //       unitPrice: watch('unitPrice') ?? 0,
                //       quantity: value,
                //       numberOfAllocationPeriods:
                //         watch('numberOfAllocationPeriods') ?? 0,
                //     })
                //     if (res && res.data) {
                //       setValue(
                //         'periodicAllocation',
                //         res?.data?.periodicAllocation
                //       )
                //     }
                //   } else {
                //     setValue('recordedValue', '')
                //     setValue('periodicAllocation', '')
                //   }
                // }}
              />
            </Grid>

            {
              <Grid
                item
                xs={12}
                sm={12}
                md={4}
                lg={4}
                style={{
                  marginBottom: '15px',
                }}
              >
                <CoreInput
                  isViewProp={watch('typeAddNew') !== 'HANDMADE' || isUpdate}
                  control={control}
                  name='unitPrice'
                  label='Đơn giá'
                  placeholder='Nhập đơn giá'
                  required
                  type='number'
                  rules={{
                    validate: (val: number) => {
                      if (val < 0) return 'Số lượng không hợp lệ'
                    },
                    required: t('common:validation.required'),
                  }}
                  InputProps={{
                    endAdornment: `${currency}`,
                  }}
                  onChangeValue={async (value) => {
                    if (
                      value &&
                      value >= 0 &&
                      Number(watch('numberOfAllocationPeriods')) > 0 &&
                      Number(watch('quantity')) > 0
                    ) {
                      setValue('recordedValue', value * watch('quantity'))
                      const res = await getCalculator({
                        unitPrice: value,
                        quantity: watch('quantity'),
                        numberOfAllocationPeriods:
                          watch('numberOfAllocationPeriods') ?? 0,
                      })
                      if (res && res.data) {
                        setValue(
                          'periodicAllocation',
                          res?.data?.periodicAllocation
                        )
                      }
                    } else {
                      setValue('recordedValue', '')
                      setValue('periodicAllocation', '')
                    }
                  }}
                />
              </Grid>
            }

            <Grid
              item
              xs={12}
              sm={12}
              md={4}
              lg={4}
              style={{
                marginBottom: '15px',
              }}
            >
              <CoreInput
                // isViewProp={watch('typeAddNew') !== 'HANDMADE' }
                isViewProp={true}
                control={control}
                name='recordedValue'
                label='Giá trị ghi tăng'
                type='number'
                placeholder='Nhập số giá trị ghi tăng'
                rules={{
                  validate: (val: number) => {
                    if (val < 0 && Number(watch('recordedValue')) < 0)
                      return 'Giá trị ghi không hợp lệ'
                  },
                }}
                InputProps={{
                  endAdornment: `${currency}`,
                }}
              />
            </Grid>

            <Grid
              item
              xs={12}
              sm={12}
              md={4}
              lg={4}
              style={{
                marginBottom: '15px',
              }}
            >
              <CoreInput
                control={control}
                name='numberOfAllocationPeriods'
                label='Số kỳ phân bổ'
                placeholder='Nhập số kỳ phân bổ'
                type='number'
                required
                rules={{
                  required: t('common:validation.required'),
                  validate: (val: number) => {
                    if (val < 0 || val > 12) return 'Giá trị không hợp lệ'
                  },
                }}
                InputProps={{
                  endAdornment: 'Tháng',
                }}
                onChangeValue={async (value) => {
                  if (
                    value &&
                    value > 0 &&
                    value <= 12 &&
                    Number(watch('unitPrice')) > 0 &&
                    Number(watch('quantity')) > 0
                  ) {
                    const res = await getCalculator({
                      unitPrice: Number(watch('unitPrice')) ?? 0,
                      quantity: watch('quantity'),
                      numberOfAllocationPeriods: value,
                    })
                    if (res && res.data) {
                      setValue('recordedValue', res?.data?.recordedValue)
                      setValue(
                        'periodicAllocation',
                        res?.data?.periodicAllocation
                      )
                    }
                  } else {
                    setError('numberOfAllocationPeriods', {
                      message: 'Giá trị không hợp lệ',
                    })
                    setValue('recordedValue', '')
                    setValue('periodicAllocation', '')
                  }
                }}
              />
            </Grid>

            <Grid
              item
              xs={12}
              sm={12}
              md={4}
              lg={4}
              style={{
                marginBottom: '15px',
              }}
            >
              <CoreInput
                control={control}
                name='periodicAllocation'
                label='Số tiền PBHK'
                type='number'
                placeholder='Nhập số tiền PBHK'
                isViewProp={true}
                rules={{
                  validate: (val: number) => {
                    if (
                      val < 0 &&
                      (watch('numberOfAllocationPeriods') ?? 0) < 0
                    )
                      return 'Giá trị không hợp lệ'
                  },
                }}
                InputProps={{
                  endAdornment: `${currency}`,
                }}
              />
            </Grid>

            <Grid
              item
              xs={12}
              sm={12}
              md={4}
              lg={4}
              style={{
                marginBottom: '15px',
              }}
            >
              <CoreAutoCompleteAPI
                label='Tài khoản chờ phân bổ'
                control={control}
                name='waitingAllocation'
                valuePath='id'
                labelPath2='code'
                placeholder='Tài khoản cho phân bổ'
                params={{}}
                fetchDataFn={getAccountList}
                required
                rules={{
                  required: t('common:validation.required'),
                  validate: (val: number) => {
                    if (val < 0 || val > 12) return 'Giá trị không hợp lệ'
                  },
                }}
              />
            </Grid>

            <Grid
              item
              xs={12}
              sm={12}
              md={8}
              lg={8}
              style={{
                marginBottom: '15px',
              }}
            ></Grid>

            <Grid
              item
              xs={12}
              sm={12}
              md={4}
              lg={4}
              style={{
                marginBottom: '15px',
              }}
            >
              {!isUpdate ? (
                <CoreCheckbox
                  control={control}
                  name='isNoDepreciation'
                  label='Ngừng tính khấu hao'
                />
              ) : (
                <CoreCheckbox
                  control={control}
                  name='isDiscontinueAllocation'
                  onChangeValue={debounce(async (val: any) => {
                    if (id) {
                      try {
                        const res = await checkDiscontinueAllocation({
                          id: id,
                          isDiscontinueAllocation: val,
                        })
                        if (res && res.id) {
                          successMsg(t('common:message.success'))
                        }
                      } catch (error) {
                        errorMsg('Ngừng phân bổ lỗi!')
                      }
                    }
                  }, 1500)}
                  label='Ngừng phân bổ'
                />
              )}
            </Grid>
          </Grid>

          <MyCollapse title='Thiết lập phân bổ' className='mt-5'>
            <TableCustomDnd
              setValue={setValue}
              watch={watch}
              fieldsName='lines'
              className='mt-10'
              columns={columnSaveEscTool}
              data={tableDataSaveEscTool}
              actionTable={
                !(actionType === 'VIEW') ? (
                  !isUpdate ? (
                    <ActionTable
                      action='Thêm dòng'
                      columns={columnSaveEscTool}
                      defaultValueLine={{ ratio: '' }}
                      append={apLinesTool}
                    />
                  ) : null
                ) : null
              }
            />
          </MyCollapse>

          {actionType !== 'VIEW' && (
            <div className='space-x-12 text-center my-10'>
              <CoreButton theme='cancel' onClick={onCancel}>
                {t('common:btn.cancel')}
              </CoreButton>

              <CoreButton
                theme='submit'
                type='submit'
                loading={isLoadingSubmit}
              >
                {isUpdate ? t('common:btn.save_change') : t('common:btn.add')}
              </CoreButton>
            </div>
          )}
        </form>
      </div>
    </PageWithDetail>
  )
}

export default SaveEscTool
