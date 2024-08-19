import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import { CoreButton } from '@/components/atoms/CoreButton'
import CoreCheckbox from '@/components/atoms/CoreCheckbox'
import CoreInput from '@/components/atoms/CoreInput'
import CoreSwitch from '@/components/atoms/CoreSwitch'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import CoreLoading from '@/components/molecules/CoreLoading'
import { TopAction } from '@/components/molecules/TopAction'
import CoreNavbar from '@/components/organism/CoreNavbar'
import PageContainer from '@/components/organism/PageContainer'
import { CustomTable } from '@/components/organism/TableCustom'
import {
  scopeTypeWithAllSelect,
  taxComputeTypeSelect,
  taxTypeList,
} from '@/enum'
import { useAppSelector } from '@/redux/hook'
import { MENU_URL } from '@/routes'
import { getCountryList } from '@/service/common/country/getList'
import { Grid, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import DialogDeleteTax from '../DialogDeleteTax'
import useSaveTag from './useSaveTag'

const SaveTax = () => {
  const [
    {
      id,
      name,
      isUpdate,
      isLoading,
      isLoadingSubmit,
      methodForm,
      columns,
      tableData,
      isView,
    },
    { t, onSubmit, onCancel, append },
  ] = useSaveTag()

  const { currency } = useAppSelector((state) => state.companyConfigData)
  const router = useRouter()
  const { actionType } = router.query
  const { showDialog } = useDialog()
  const { watch, control, setValue, trigger } = methodForm

  return (
    <PageContainer
      title={
        <CoreBreadcrumbs
          isShowDashboard
          breadcrumbs={[
            {
              title: t('title'),
              pathname: MENU_URL.CONFIG.ACCOUNTING.TAX,
            },
            {
              title: isUpdate ? name : t('common:btn.add'),
            },
          ]}
        />
      }
    >
      <CoreNavbar
        breadcrumbs={[
          {
            title: 'Chi tiết',
            content: isLoading ? (
              <div className='flex justify-center min-h-[600px]'>
                <CoreLoading />
              </div>
            ) : (
              <form onSubmit={onSubmit}>
                <div className='block bg-[#ffffff] mt-15 rounded-xl mx-auto'>
                  <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                      <CoreInput
                        control={control}
                        name='name'
                        label='Tên loại thuế'
                        placeholder='Nhập tên loại thuế'
                        inputProps={{
                          maxLength: 250,
                        }}
                        required
                        rules={{ required: t('common:validation.required') }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={12} md={4} lg={4}>
                      <CoreAutocomplete
                        control={control}
                        name='type'
                        label='Kiểu thuế'
                        placeholder='Chọn kiểu thuế'
                        required
                        options={taxTypeList}
                        rules={{ required: t('common:validation.required') }}
                        onChangeValue={(val) => {
                          if (val !== 'VAT_RATES') {
                            setValue('scopeType', null)
                            setValue('repartitions', [
                              {
                                account: null,
                                scopeType: null,
                              },
                            ])
                          }
                        }}
                      />
                    </Grid>

                    {watch('type') === 'VAT_RATES' && (
                      <Grid item xs={12} sm={12} md={4} lg={4}>
                        <CoreAutocomplete
                          control={control}
                          name='scopeType'
                          label='Phạm vi sử dụng thuế'
                          placeholder='Chọn phạm vi sử dụng thuế'
                          required
                          options={scopeTypeWithAllSelect}
                          rules={{ required: t('common:validation.required') }}
                          disableClearable
                          onChangeValue={(val) => {
                            if (val === 'ALL') {
                              setValue('repartitions', [
                                {
                                  account: null,
                                  scopeType: 'SALE',
                                },
                                {
                                  account: null,
                                  scopeType: 'PURCHASE',
                                },
                              ])
                            } else {
                              setValue('repartitions', [
                                {
                                  account: null,
                                  scopeType: val,
                                },
                              ])
                            }
                          }}
                        />
                      </Grid>
                    )}

                    <Grid item xs={12} sm={12} md={4} lg={4}>
                      <CoreAutocomplete
                        control={control}
                        name='taxComputeType'
                        label='Cách tính thuế theo'
                        placeholder='Chọn cách tính thuế theo'
                        required
                        options={taxComputeTypeSelect}
                        rules={{ required: t('common:validation.required') }}
                        disableClearable
                      />
                    </Grid>

                    <Grid item xs={12} sm={12} md={4} lg={4}>
                      {isView ? (
                        <CoreInput
                          control={control}
                          name='amount'
                          label={
                            watch('taxComputeType') === 'PERCENT'
                              ? 'Phần trăm thuế'
                              : 'Số tiền'
                          }
                          value={`${watch('amount')} ${
                            watch('taxComputeType') === 'PERCENT'
                              ? '%'
                              : currency ?? 'VND'
                          }`}
                        />
                      ) : (
                        <CoreInput
                          control={control}
                          name='amount'
                          label={
                            watch('taxComputeType') === 'PERCENT'
                              ? 'Phần trăm thuế'
                              : 'Số tiền'
                          }
                          type='number'
                          placeholder='Nhập số tiền'
                          InputProps={{
                            endAdornment: (
                              <Typography variant='body2'>
                                {watch('taxComputeType') === 'PERCENT'
                                  ? '%'
                                  : currency ?? 'VND'}
                              </Typography>
                            ),
                          }}
                          rules={{
                            required: t('common:validation.required'),
                          }}
                        />
                      )}
                    </Grid>

                    <Grid item xs={12} sm={12} md={4} lg={4}>
                      <CoreInput
                        control={control}
                        name='sequence'
                        type='number'
                        label='Độ ưu tiên'
                        placeholder='Nhập độ ưu tiên'
                        required
                        rules={{ required: t('common:validation.required') }}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <CoreInput
                        multiline
                        control={control}
                        name='description'
                        label='Mô tả'
                        placeholder='Mô tả'
                        inputProps={{
                          maxLength: 1000,
                        }}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <CoreSwitch control={control} name='isActive' />
                    </Grid>
                  </Grid>
                </div>

                <Grid item xs={12} style={{ marginTop: '20px' }}>
                  <Typography variant='h5'>
                    Phân phối thuế vào tài khoản kế toán
                  </Typography>
                  <CustomTable
                    className='mt-10'
                    columns={columns}
                    data={tableData}
                    paginationHidden={true}
                    showInfoText={false}
                    isShowColumnStt
                  />
                </Grid>

                {watch('taxComputeType') === 'GROUP_OF_TAXES' ? null : (
                  <>
                    <Grid item xs={12} style={{ marginTop: '30px' }}>
                      <Typography variant='h5'>Thiết lập nâng cao</Typography>
                    </Grid>

                    <div className='block bg-[#ffffff] mt-15 mx-10 rounded-xl'>
                      <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item xs={12} sm={10} md={5} lg={3.5}>
                          <CoreAutoCompleteAPI
                            control={control}
                            name='country'
                            label='Quốc gia'
                            placeholder='Chọn quốc gia'
                            labelPath='name'
                            valuePath='id'
                            fetchDataFn={getCountryList}
                          />
                        </Grid>

                        <Grid item xs={12} style={{ paddingTop: '10px' }}>
                          <CoreCheckbox
                            name='isIncludedPrice'
                            control={control}
                            label={'Giá bao gồm thuế'}
                            onChangeValue={(checked: boolean) => {
                              if (checked) {
                                methodForm.setValue('isAffectingBase', true)
                              }
                            }}
                          />
                        </Grid>

                        <Grid item xs={12} style={{ paddingTop: '10px' }}>
                          <CoreCheckbox
                            name='isAffectingBase'
                            control={control}
                            label='Tác động đến giá trị tính thuế kế tiếp'
                            onChangeValue={(checked: boolean) => {
                              if (!checked) {
                                methodForm.setValue('isIncludedPrice', false)
                              }
                            }}
                          />
                        </Grid>

                        <Grid item xs={12} style={{ paddingTop: '10px' }}>
                          <CoreCheckbox
                            name='baseIsAffected'
                            control={control}
                            label='Giá trị tính thuế chịu tác động của thuế trước đó'
                          />
                        </Grid>
                      </Grid>
                    </div>
                  </>
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
            rightAction: isUpdate ? (
              <TopAction
                actionList={isView ? ['edit', 'delete'] : ['delete']}
                onEditAction={() => {
                  router.replace({
                    pathname: `${MENU_URL.CONFIG.ACCOUNTING.TAX}/[id]`,
                    query: {
                      id,
                    },
                  })
                }}
                onDeleteAction={() =>
                  showDialog(
                    <DialogDeleteTax
                      id={Number(id)}
                      refetch={() => {
                        router.push({
                          pathname: MENU_URL.CONFIG.ACCOUNTING.TAX,
                        })
                      }}
                    />
                  )
                }
              />
            ) : null,
          },
        ]}
      />
    </PageContainer>
  )
}

export default SaveTax
