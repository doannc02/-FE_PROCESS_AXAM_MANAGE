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
import useSaveMMC from './useSaveMMC'
import UomAutocomplete from '../../../_component/UomAutocomplete'
import { getUomProductList } from '@/service/product/productController/getUomGroup'
import { getUomBaseOfProduct } from '@/service/product/productController/getUomBase'
import { DialogAcceptEdit } from '../../Dialog/DialogAcceptEdit'
import { DialogDelete } from '../../Dialog/DialogDelete'

const SaveMMC = () => {
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
    { t, onSubmit, onCancel, setValue, append, remove },
  ] = useSaveMMC()

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
                title: 'QL bảng giá NVL đầu vào',
                pathname:
                  MENU_URL.COST.BOM_COST_MANAGE.MANAGE_MATERIAL_COST_INPUT,
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
                      refetch={() => {}}
                      title='Bảng giá NVL đầu vào'
                      onSubmitEdit={() => {
                        hideDialog()
                        router.replace({
                          pathname: `${MENU_URL.COST.BOM_COST_MANAGE.MANAGE_MATERIAL_COST_INPUT}/[id]`,
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
                      title='bảng giá NVL'
                      refetch={() => {}}
                      id={id}
                      type='MMC'
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
                        fetchDataFn={getProductList2}
                        control={control}
                        name='data.product'
                        required
                        rules={{
                          required: t('common:validation.required'),
                        }}
                        onChangeValue={async (val) => {
                          // setValue(`invoiceLines.${index}`, currentLine)
                          if (val) {
                            const res = await getUomBaseOfProduct({
                              productId: val?.id,
                            })
                            if (res && res.data) setValue(`data.uom`, res.data)
                          } else {
                            setValue(`data.uom`, null)
                          }
                        }}
                      />
                    </Grid>

                    {watch('data.product.id') && (
                      <Grid item xs={12} sm={12} md={4} lg={4}>
                        <UomAutocomplete
                          readOnly={true}
                          control={control}
                          name={`data.uom`}
                          label='Đơn vị tính'
                          placeholder='Chọn đơn vị tính'
                          fetchDataFn={getUomProductList}
                          params={{
                            id: Number(watch(`data.product`)?.id),
                          }}
                        />
                      </Grid>
                    )}
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                      <CoreInput
                        control={control}
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

export default SaveMMC
