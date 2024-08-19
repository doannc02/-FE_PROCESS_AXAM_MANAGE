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
import DialogDeleteAssetHandMande from '@/components/templates/Accounting/Dialog/DialogDeleteAssetHandmade'
import DialogDeleteToolEscHM from '@/components/templates/Accounting/Dialog/DialogDeleteToolEscHandMade'
import { MENU_URL } from '@/routes'
import { getAccountList } from '@/service/accounting/account/getList'
import { getDevice } from '@/service/accounting/fixedAsset/device'
import { getToolsAssetList } from '@/service/accounting/toolsAssetCategory/getList'
import { getDepartmentList } from '@/service/common/department/getList'
import { getProductList2 } from '@/service/product/productController/getListProForToolsAsset'
import { Grid, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import MyCollapse from '../../../../V1/AccountConfig/MyCollapse'
import useSaveEscAssets from './useSaveEscAssets'
import { checkDiscontinueAllocation } from '@/service/accounting/increaseTools/checkDiscontinueAllocation'
import { debounce } from 'lodash'
import { errorMsg, successMsg } from '@/helper/message'
const SaveEscHandMadeAsset = () => {
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
    tableDataSaveEscAsset,
    currency,
    columnSaveEscTool,
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
  const { control, getValues, watch, setValue } = methodForm

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
                  title: <Typography>Tài Sản</Typography>,
                  pathname: `${MENU_URL.ASSET.ESC}`,
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
                      pathname: `${MENU_URL.ASSET.ESC}/${pathRedirect}/[id]`,
                      query: {
                        id,
                      },
                    })
                  }}
                  onDeleteAction={() => {
                    showDialog(
                      <DialogDeleteAssetHandMande
                        id={id}
                        refetch={() => {
                          router.push({
                            pathname: MENU_URL.ASSET.ESC,
                          })
                        }}
                      />
                    )
                  }}
                />
              )
            ) : watch('isExistDepreciation') ? (
              <TopAction
                actionList={['edit']}
                onEditAction={() => {
                  router.replace({
                    pathname: `${MENU_URL.ASSET.ESC}/${pathRedirect}/[id]`,
                    query: {
                      id,
                    },
                  })
                }}
              />
            ) : (
              <TopAction
                actionList={['edit', 'delete']}
                onEditAction={() => {
                  router.replace({
                    pathname: `${MENU_URL.ASSET.ESC}/${pathRedirect}/[id]`,
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
                          pathname: MENU_URL.ASSET.ESC,
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
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <CoreInput
                control={control}
                name='code'
                label='Mã ghi tăng'
                placeholder='Nhập mã ghi tăng'
              />
            </Grid>

            <Grid item xs={12} sm={12} md={4} lg={4}>
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

            <Grid item xs={12} sm={12} md={4} lg={4}>
              <CoreAutoCompleteAPI
                control={control}
                name='category'
                label='Loại tài sản'
                params={{
                  categoryType: 'ASSET',
                  accountLedgerId,
                }}
                fetchDataFn={getToolsAssetList}
                placeholder='Chọn loại tài sản'
                onChangeValue={(val) => {
                  setValue('originalPriceAccount', val?.originalAccount)
                  setValue('depreciationAccount', val?.depreciationAccount)
                }}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={4} lg={4}>
              <CoreAutoCompleteAPI
                label='Mã tài sản'
                control={control}
                name='product'
                params={{
                  isGood: true,
                }}
                isViewProp={isUpdate ? true : !!typeAddNewRouter ? true : false}
                required
                rules={{
                  required: t('common:validation.required'),
                }}
                isHasMessageError={true}
                labelPath='sku'
                fetchDataFn={getProductList2}
                placeholder='Chọn mã tài sản'
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
                    setValue('product.id', value?.id)
                    setValue('unit.name', '')
                    setValue('unit.code', '')
                    setValue('unit.id', null)
                  }
                }}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={4} lg={4}>
              <CoreInput
                control={control}
                name='product.name'
                label='Tên tài sản'
                isViewProp={true}
                readOnly={true}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={4} lg={4}>
              <CoreAutoCompleteAPI
                control={control}
                name='department'
                label='Phòng ban quản lý'
                params={
                  {
                    // activated: true,
                  }
                }
                fetchDataFn={getDepartmentList}
                placeholder='Chọn phòng ban quản lý'
              />
            </Grid>

            <Grid item xs={12} sm={12} md={4} lg={4}>
              <CoreInput
                control={control}
                name='reason'
                label='Lý do ghi tăng'
                placeholder='Nhập lý do ghi tăng'
              />
            </Grid>

            <Grid item xs={12} sm={12} md={4} lg={4}></Grid>

            <Grid item xs={12} sm={12} md={4} lg={4}></Grid>

            <Grid item xs={12} sm={12} md={4} lg={4}>
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

          {!watch('isNoDepreciation') && (
            <>
              <MyCollapse title='Thông tin khấu hao' className='mt-5'>
                <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={4}
                    lg={4}
                    style={{
                      marginBottom: '15px',
                      marginTop: '15px',
                    }}
                  >
                    <CoreAutoCompleteAPI
                      control={control}
                      name='originalPriceAccount'
                      label='Tài khoản nguyên giá'
                      labelPath2='code'
                      placeholder='Chọn tài khoản nguyên giá'
                      params={{}}
                      fetchDataFn={getAccountList}
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
                      marginTop: '15px',
                    }}
                  >
                    <CoreInput
                      control={control}
                      name='recordedValue'
                      type='number'
                      label='Nguyên giá'
                      placeholder='Nhập giá trị'
                      InputProps={{
                        endAdornment: <Typography>{currency}</Typography>,
                      }}
                      onChangeValue={async (val) => {
                        if (val && watch('numberOfAllocationPeriods')) {
                          const res = await getDevice({
                            recordedValue: val,
                            numberOfAllocationPeriods:
                              watch('numberOfAllocationPeriods') ?? 0,
                          })
                          if (res && res?.data) {
                            setValue('periodicAllocation', res?.data)
                          }
                        }
                        if (!val || !watch('recordedValue')) {
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
                      isViewProp={
                        watch('typeAddNew') !== 'HANDMADE' || isUpdate
                      }
                      control={control}
                      name='quantity'
                      label='Số lượng ghi tăng'
                      placeholder='Nhập số lượng ghi tăng'
                      required
                      type='number'
                      rules={{
                        validate: (val: number) => {
                          if (val < 0 && Number(watch('quantity')) < 0)
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

                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={4}
                    lg={4}
                    style={{
                      marginBottom: '15px',
                      marginTop: '15px',
                    }}
                  >
                    <CoreInput
                      control={control}
                      name='numberOfAllocationPeriods'
                      label='Thời gian khấu hao'
                      placeholder='Nhập thời gian khấu hao'
                      type='number'
                      InputProps={{
                        endAdornment: 'Tháng',
                      }}
                      onChangeValue={async (val) => {
                        if (val && watch('recordedValue')) {
                          const res = await getDevice({
                            recordedValue: watch('recordedValue') ?? 0,
                            numberOfAllocationPeriods: val,
                          })
                          if (res && res?.data) {
                            setValue('periodicAllocation', res?.data)
                          }
                        }
                        if (!val || !watch('recordedValue')) {
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
                    <CoreAutoCompleteAPI
                      control={control}
                      name='depreciationAccount'
                      label='Tài khoản khấu hao'
                      placeholder='Chọn tài khoản khấu hao'
                      labelPath2='code'
                      params={{}}
                      fetchDataFn={getAccountList}
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
                    <CoreInput
                      control={control}
                      name='periodicAllocation'
                      label='Giá trị khấu hao'
                      type='number'
                      isViewProp={true}
                      InputProps={{
                        endAdornment: <Typography>{currency}</Typography>,
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
                    <CoreDatePicker
                      control={control}
                      name='startDepreciation'
                      title='Ngày bắt đầu tính khấu hao'
                      placeholder='Chọn ngày bắt đầu tính khấu hao'
                      format='YYYY-MM-DD'
                      required
                      rules={{
                        required: t('common:validation.required'),
                      }}
                    />
                  </Grid>
                </Grid>
              </MyCollapse>
              <MyCollapse title='Thiết lập phân bổ' className='mb-5'>
                <TableCustomDnd
                  setValue={setValue}
                  watch={watch}
                  fieldsName='lines'
                  className='mt-10'
                  columns={columnSaveEscTool}
                  data={tableDataSaveEscAsset}
                  actionTable={
                    !(actionType === 'VIEW') ? (
                      <ActionTable
                        action='Thêm dòng'
                        columns={columnSaveEscTool}
                        defaultValueLine={{ ratio: '' }}
                        append={apLinesTool}
                      />
                    ) : null
                  }
                />
              </MyCollapse>
            </>
          )}

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

export default SaveEscHandMadeAsset
