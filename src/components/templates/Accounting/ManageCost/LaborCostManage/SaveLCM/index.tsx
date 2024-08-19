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
import useSaveLCM from './useSaveLCM'
import { DialogAcceptEdit } from '../../Dialog/DialogAcceptEdit'
import { DialogDelete } from '../../Dialog/DialogDelete'

const SaveLCM = () => {
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
  ] = useSaveLCM()

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
                title: 'QL bảng giá nhân công',
                pathname: MENU_URL.COST.BOM_COST_MANAGE.LABOR_COST_INPUT,
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
                      title='Bảng giá nhân công'
                      onSubmitEdit={() => {
                        hideDialog()
                        router.replace({
                          pathname: `${MENU_URL.COST.BOM_COST_MANAGE.LABOR_COST_INPUT}/[id]`,
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
                      title='bảng giá nhân công'
                      refetch={() => {}}
                      id={id}
                      type='LCM'
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
                {!isUpdate ? (
                  <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                      <CoreAutocomplete
                        control={control}
                        name='salaryMethodType'
                        label={'Phương pháp tính lương'}
                        options={salaryMethodType}
                        isViewProp={isUpdate}
                        onChangeValue={(val) => {
                          setValue('data', [
                            {
                              salaryMethodType: val,
                            },
                          ])
                        }}
                      ></CoreAutocomplete>
                    </Grid>
                  </Grid>
                ) : (
                  <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                      <CoreAutocomplete
                        control={control}
                        name='salaryMethodType'
                        label='Phương pháp tính lương'
                        options={salaryMethodType}
                        //  isViewProp={isUpdate}
                        onChangeValue={(val) => {
                          if (val) {
                            setValue('data.timeType', null)
                            setValue('data.price', '')
                            setValue('data.product', null)
                          }
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                      {watch('salaryMethodType') === 'PRODUCT' ? (
                        <CoreAutoCompleteAPI
                          params={{ isGood: true }}
                          label='Thành phẩm'
                          placeholder='Chọn thành phẩm'
                          fetchDataFn={getProductList2}
                          control={control}
                          name={`data.product`}
                        />
                      ) : (
                        <CoreAutocomplete
                          control={control}
                          label='Đơn vị tính'
                          placeholder='Chọn đơn vị tính'
                          name={`data.timeType`}
                          options={[
                            { value: 'DAY', label: 'Ngày' },
                            { value: 'HOUR', label: 'Giờ' },
                          ]}
                        />
                      )}
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                      <CoreInput
                        control={control}
                        type='number'
                        label={`Đơn giá (${currency})`}
                        placeholder='Nhập đơn giá'
                        name={`data.price`}
                        required
                        rules={{
                          required: t('common:validation.required'),
                          validate: (val: number) => {
                            if (val && val < 0) {
                              return 'Giá trị không hợp lệ'
                            }
                          },
                        }}
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
                        watch('salaryMethodType') === 'BASIC' &&
                        tableData.length < 2 ? (
                          !isView ? (
                            <ActionTable
                              columns={columns}
                              append={append}
                              defaultValueLine={{
                                product: null,
                                salaryMethodType: watch('salaryMethodType'),
                              }}
                            />
                          ) : null
                        ) : watch('salaryMethodType') === 'PRODUCT' ? (
                          !isView ? (
                            <ActionTable
                              columns={columns}
                              append={append}
                              defaultValueLine={{
                                product: null,
                                salaryMethodType: watch('salaryMethodType'),
                              }}
                            />
                          ) : null
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

export default SaveLCM
