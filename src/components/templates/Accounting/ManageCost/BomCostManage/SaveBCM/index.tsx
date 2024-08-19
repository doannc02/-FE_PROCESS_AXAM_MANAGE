import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import { CoreButton } from '@/components/atoms/CoreButton'
import CoreInput from '@/components/atoms/CoreInput'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import { TopAction } from '@/components/molecules/TopAction'
import CoreNavbar from '@/components/organism/CoreNavbar'
import { CoreTable } from '@/components/organism/CoreTable'
import PageContainer from '@/components/organism/PageContainer'
import { ActionTable } from '@/components/organism/TableCustomDnd/ActionTable'
import { salaryMethodType } from '@/enum'
import { MENU_URL } from '@/routes'
import { getProductList2 } from '@/service/product/productController/getListProForToolsAsset'
import { Grid } from '@mui/material'
import { useRouter } from 'next/router'
import UomAutocomplete from '../../../_component/UomAutocomplete'
import { getUomProductList } from '@/service/product/productController/getUomGroup'
import { getUomBaseOfProduct } from '@/service/product/productController/getUomBase'
import useSaveBCM from './useSaveBCM'
import {
  getProductPlaneBoms,
  handleGetListListBomNotDistribution,
  handleGetListListProduct,
} from '@/service/manufactory/productProcess/getList'
import { DialogDelete } from '../../Dialog/DialogDelete'
import { DialogAcceptEdit } from '../../Dialog/DialogAcceptEdit'
import { calculatePricing } from '@/service/accounting/manageCost/bomPrice'

const SaveBCM = () => {
  const [
    {
      currency,
      id,
      name,
      fields,
      isUpdate,
      isLoadingSubmit,
      isView,
      methodForm,
      columns,
      tableData,
    },
    { t, onSubmit, onCancel, setValue, append, getValues, remove, refetch },
  ] = useSaveBCM()

  const { control, watch } = methodForm

  const router = useRouter()
  const { actionType } = router.query
  const { showDialog, hideDialog } = useDialog()

  return (
    <PageContainer
      title={
        <div className='flex justify-between items-center'>
          <CoreBreadcrumbs
            isShowDashboard
            breadcrumbs={[
              {
                title: 'Định mức chi phí chung',
                pathname: MENU_URL.COST.BOM_COST_MANAGE.BOM_COST_GENERAL,
              },
              {
                title: isUpdate
                  ? isView
                    ? 'Chi tiết'
                    : 'Chỉnh sửa'
                  : t('common:btn.add'),
              },
            ]}
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
                  isView ? ['edit', 'delete'] : isUpdate ? ['delete'] : []
                }
                onEditAction={() => {
                  showDialog(
                    <DialogAcceptEdit
                      refetch={() => refetch()}
                      title='Định mức chi phí chung'
                      onSubmitEdit={() => {
                        hideDialog()
                        router.replace({
                          pathname: `${MENU_URL.COST.BOM_COST_MANAGE.BOM_COST_GENERAL}/[id]`,
                          query: {
                            id,
                          },
                        })
                      }}
                    />
                  )
                }}
                onDeleteAction={() => {
                  showDialog(
                    <DialogDelete
                      title='định mức chi phí chung'
                      refetch={() => {
                        refetch()
                      }}
                      id={id}
                      type='BCM'
                    />
                  )
                }}
              />
            ),
            content: (
              <form
                className='block bg-[#ffffff] mt-15 rounded-xl mx-auto'
                onSubmit={onSubmit}
              >
                {!isUpdate ? null : (
                  <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                      <CoreAutoCompleteAPI
                        params={{ isGood: true }}
                        label='Thành phẩm'
                        placeholder='Chọn thành phẩm'
                        labelPath='name'
                        valuePath='id'
                        fetchDataFn={handleGetListListProduct}
                        control={control}
                        name='data.product'
                        onChangeValue={async (val) => {
                          // setValue(`invoiceLines`, currentLine)
                          if (val) {
                            if (
                              getValues(`data.bom`)?.id &&
                              getValues(`data.costPercentage`)
                            ) {
                              const res = await calculatePricing({
                                productId: val?.id,
                                bomId: getValues(`data.bom`)?.id,
                                processId: val.processId,
                                costPercentage:
                                  getValues(`data.costPercentage`),
                              })

                              if (res.data && typeof res.data === 'number') {
                                setValue(`data.price`, res.data)
                              }
                            }
                          } else {
                            setValue(`data.bom`, null)
                            setValue(`data.price`, 0)
                            setValue(`data.costPercentage`, 0)
                          }
                        }}
                      />
                    </Grid>

                    {watch('data.product.id') && (
                      <Grid item xs={12} sm={12} md={4} lg={4}>
                        <CoreAutoCompleteAPI
                          label=''
                          placeholder='Chọn mã định mức'
                          control={control}
                          isViewProp={!watch(`data.product`)?.id}
                          params={{
                            isAllocation: false,
                            productId: watch(`data.product`)?.id,
                          }}
                          labelPath='code'
                          valuePath='id'
                          fetchDataFn={handleGetListListBomNotDistribution}
                          onChangeValue={async (val) => {
                            // setValue(`invoiceLines.${index}`, currentLine)
                            if (val) {
                              if (
                                getValues(`data.product`)?.id &&
                                getValues(`data.costPercentage`) &&
                                getValues(`data.product`)?.processId
                              ) {
                                const res = await calculatePricing({
                                  productId: getValues(`data.product`)?.id,
                                  bomId: getValues(`data.bom`)?.id,
                                  processId:
                                    getValues(`data.product`).processId,
                                  costPercentage:
                                    getValues(`data.costPercentage`),
                                })

                                if (res.data && typeof res.data === 'number') {
                                  setValue(`data.price`, res.data)
                                }
                              }
                            } else {
                              setValue(`data.price`, 0)
                              setValue(`data.costPercentage`, 0)
                            }
                          }}
                          name={`data.bom`}
                        />
                      </Grid>
                    )}

                    <Grid item xs={12} sm={12} md={4} lg={4}>
                      <CoreInput
                        control={control}
                        label='Chiếm số & tổng chi phí trực tiếp'
                        placeholder='Nhập tổng chi phí trực tiếp'
                        name={`data.costPercentage`}
                        type='number'
                        onChangeValue={async (val) => {
                          // setValue(`invoiceLines.${index}`, currentLine)
                          if (val) {
                            if (
                              getValues(`data.product`)?.id &&
                              getValues(`data.bom`)?.id &&
                              getValues(`data.product`)?.processId
                            ) {
                              const res = await calculatePricing({
                                productId: getValues(`data.product`)?.id,
                                bomId: getValues(`data.bom`)?.id,
                                processId: getValues(`data.product`).processId,
                                costPercentage:
                                  getValues(`data.costPercentage`),
                              })

                              if (res.data && typeof res.data === 'number') {
                                setValue(`data.price`, res.data)
                              }
                            }
                          } else {
                            setValue(`data.bom`, null)
                          }
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={12} md={4} lg={4}>
                      <CoreInput
                        control={control}
                        isViewProp={true}
                        required
                        rules={{
                          required: t('common:validation.required'),
                          validate: (val: number) => {
                            if (val && val < 0) {
                              return 'Giá trị không hợp lệ'
                            }
                          },
                        }}
                        label={`Đơn giá (${currency})`}
                        placeholder='Nhập đơn giá'
                        name={`data.price`}
                        type='number'
                      />
                    </Grid>
                  </Grid>
                )}

                {!isUpdate && (
                  <div>
                    <CoreTable
                      className='mt-15'
                      paginationHidden
                      showInfoText
                      // tableName='save-thcp'
                      data={tableData}
                      columns={columns}
                      isShowColumnStt
                      actionTable={
                        !isView ? (
                          <ActionTable
                            columns={columns}
                            append={append}
                            defaultValueLine={{
                              product: null,
                            }}
                          />
                        ) : null
                      }
                    />
                  </div>
                )}

                {actionType !== 'VIEW' && (
                  <div className='space-x-12 text-center mt-10'>
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
            ),
          },
        ]}
      ></CoreNavbar>
    </PageContainer>
  )
}

export default SaveBCM
