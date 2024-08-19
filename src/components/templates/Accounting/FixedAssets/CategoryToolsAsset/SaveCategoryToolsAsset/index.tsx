import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import { CoreButton } from '@/components/atoms/CoreButton'
import CoreInput from '@/components/atoms/CoreInput'
import CoreSwitch from '@/components/atoms/CoreSwitch'
import LoadingPage from '@/components/atoms/LoadingPage'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import { TopAction } from '@/components/molecules/TopAction'
import CoreNavbar from '@/components/organism/CoreNavbar'
import PageContainer from '@/components/organism/PageContainer'
import { MENU_URL } from '@/routes'
import { getAccountList } from '@/service/accounting/account/getList'
import { getToolsAssetList } from '@/service/accounting/toolsAssetCategory/getList'
import { Grid, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import DialogDeleteCategoryAsset from '../../../Dialog/DialogDeleteCategoryAsset'
import useSaveCategory from './useSaveCategory'

const SaveCategoryToolsAsset = () => {
  const [values, handles] = useSaveCategory()

  const {
    accountLedgerId,
    isLoading,
    isView,
    isUpdate,
    methodForm,
    typeToolAsset,
    id,
    isLoadingSubmit,
    actionType,
  } = values

  const { t, onCancel, onSubmit } = handles
  const { control } = methodForm
  const { showDialog } = useDialog()
  const router = useRouter()

  return (
    <PageContainer
      title={
        <CoreBreadcrumbs
          isShowDashboard
          breadcrumbs={[
            {
              title: `Danh mục ${typeToolAsset === 'TOOL' ? ' CCDC' : ' TSCD'}`,
              pathname: `${MENU_URL[typeToolAsset].CATEGORY}`,
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
      }
    >
      <CoreNavbar
        breadcrumbs={[
          {
            title: 'Chi tiết',
            rightAction: isUpdate && (
              <TopAction
                actionList={isView ? ['edit', 'delete'] : ['delete']}
                onEditAction={() => {
                  router.replace({
                    pathname: `${MENU_URL[typeToolAsset].CATEGORY}/[id]`,
                    query: {
                      id: id,
                    },
                  })
                }}
                onDeleteAction={() => {
                  showDialog(
                    <DialogDeleteCategoryAsset
                      id={Number(id)}
                      refetch={() => {
                        router.push({
                          pathname: MENU_URL[typeToolAsset].CATEGORY,
                        })
                      }}
                    />
                  )
                }}
              />
            ),
            content: isLoading ? (
              <div className='flex justify-center items-center min-h-[600px]'>
                <LoadingPage />
              </div>
            ) : (
              <div className='w-full flex flex-col'>
                <form className='bg-[#ffffff] ' onSubmit={onSubmit}>
                  <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={2}
                      lg={4}
                      style={{
                        marginBottom: '15px',
                      }}
                    >
                      <CoreInput
                        control={control}
                        name='code'
                        label='Mã danh mục'
                        placeholder='Nhập mã danh mục'
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
                        name='name'
                        label='Tên danh mục'
                        placeholder='Nhập tên danh mục'
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
                        params={{
                          categoryType:
                            typeToolAsset === 'ASSET' ? 'ASSET' : 'TOOLS',
                          accountLedgerId: accountLedgerId,
                          isActive: true,
                        }}
                        control={control}
                        name='parent'
                        valuePath='id'
                        labelPath='name'
                        placeholder='Chọn danh mục cha'
                        label='Danh mục cha'
                        fetchDataFn={getToolsAssetList}
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
                        name='originalAccount'
                        params={{}}
                        label={`${
                          typeToolAsset === 'ASSET'
                            ? 'Tài khoản nguyên giá'
                            : 'Tài khoản chờ phân bổ'
                        }`}
                        labelPath2='code'
                        fetchDataFn={getAccountList}
                        placeholder={`${
                          typeToolAsset === 'ASSET'
                            ? 'Chọn tài khoản nguyên giá'
                            : 'Chọn tài khoản chờ phân bổ'
                        }`}
                        required
                        rules={{
                          required: t('common:validation.required'),
                        }}
                      />
                    </Grid>

                    {typeToolAsset === 'ASSET' && (
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
                          params={{}}
                          label='Tài khoản khấu hao'
                          labelPath2='code'
                          fetchDataFn={getAccountList}
                          placeholder='Chọn tài khoản khấu hao'
                          required
                          rules={{
                            required: t('common:validation.required'),
                          }}
                        />
                      </Grid>
                    )}

                    <Grid
                      item
                      xs={12}
                      style={{
                        marginBottom: '15px',
                      }}
                    >
                      <CoreInput
                        control={control}
                        name='description'
                        label='Mô tả'
                        placeholder='Nhập mô tả'
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <CoreSwitch
                        control={control}
                        name='isActive'
                        label='Active'
                      />
                    </Grid>
                  </Grid>

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
                        {isUpdate
                          ? t('common:btn.save_change')
                          : t('common:btn.add')}
                      </CoreButton>
                    </div>
                  )}
                </form>
              </div>
            ),
          },
        ]}
      ></CoreNavbar>
    </PageContainer>
  )
}

export default SaveCategoryToolsAsset
