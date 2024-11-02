import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import { CoreButton } from '@/components/atoms/CoreButton'
import CoreInput from '@/components/atoms/CoreInput'
import LoadingPage from '@/components/atoms/LoadingPage'
import { TopAction } from '@/components/molecules/TopAction'
import CoreNavbar from '@/components/organism/CoreNavbar'
import { CoreTable } from '@/components/organism/CoreTable'
import PageContainer from '@/components/organism/PageContainer'
import { MENU_URL } from '@/routes'
import { Grid, Typography } from '@mui/material'
import { debounce } from 'lodash'
import useSaveDepartment from './useSaveDepartment'
import CoreLoading from '@/components/molecules/CoreLoading'

const SaveDepartment = () => {
  const [values, handles] = useSaveDepartment()
  const {
    isLoading,
    isLoadingSubmit,
    methodForm,
    isUpdate,
    isView,
    id,
    router,
    tableData,
    columns,
    isLoadingTable,
    name,
  } = values
  const { onSubmit, t } = handles

  const { control } = methodForm
  return (
    <PageContainer
      title={
        <CoreBreadcrumbs
          isShowDashboard
          breadcrumbs={[
            {
              title: 'Danh sách Khoa',
              pathname: MENU_URL.DEPARTMENT,
            },
            {
              title: (
                <Typography>
                  {isUpdate
                    ? isView
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
      {isLoading ? (
        <CoreLoading />
      ) : (
        <form onSubmit={onSubmit}>
          <CoreNavbar
            breadcrumbs={[
              {
                title: `${
                  isUpdate
                    ? isView
                      ? t('common:detail')
                      : t('common:btn.edit')
                    : t('common:btn.add')
                } `,
                content: (
                  <>
                    <div className='mt-30'>
                      <Grid
                        container
                        className=''
                        spacing={{ xs: 1, sm: 2, md: 3 }}
                      >
                        <Grid
                          item
                          xs={12}
                          sm={12}
                          md={4}
                          lg={4}
                          className='mt-70'
                        >
                          <CoreInput
                            control={control}
                            label='Tên Khoa'
                            name='name'
                            required
                            rules={{
                              required: t('common:validation.required'),
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                          <Typography fontSize={'13px'}>
                            Các chuyên ngành áp dụng:
                          </Typography>
                        </Grid>

                        <Grid item xs={12}>
                          <CoreTable
                            columns={columns}
                            data={tableData}
                            paginationHidden
                            isLoading={isLoadingTable}
                            isShowColumnStt
                            onRowClick={(id: number) => {
                              router.push({
                                pathname: `${MENU_URL.MAJOR}/[id]`,
                                query: {
                                  id,
                                  actionType: 'VIEW',
                                },
                              })
                            }}
                          />
                        </Grid>
                      </Grid>
                    </div>
                    <div>
                      {!isView ? (
                        <div className='space-x-12 text-center my-10'>
                          <CoreButton
                            theme='cancel'
                            onClick={() => {
                              router.push(MENU_URL.DEPARTMENT)
                            }}
                          >
                            {t('common:btn.cancel')}
                          </CoreButton>
                          <CoreButton
                            theme='submit'
                            // type='submit'
                            onClick={debounce(() => {
                              router.push({
                                pathname: `${MENU_URL.MAJOR}/addNew`,
                                query: {
                                  idDepartment: id,
                                  nameDepartment: name,
                                },
                              })
                            }, 2000)}
                          >
                            Tạo chuyên ngành
                          </CoreButton>

                          <CoreButton
                            theme='submit'
                            type='submit'
                            loading={isLoadingSubmit}
                          >
                            {isUpdate
                              ? t('common:btn.edit')
                              : t('common:btn.add')}
                          </CoreButton>
                        </div>
                      ) : null}
                    </div>
                  </>
                ),
                rightAction: (
                  <TopAction
                    actionList={[...(isView ? ['edit'] : [])] as any}
                    onEditAction={() => {
                      router.push({
                        pathname: `${MENU_URL.DEPARTMENT}/[id]`,
                        query: {
                          id: Number(id),
                        },
                      })
                    }}
                  />
                ),
              },
            ]}
            //  tabNumber={tabNumber}
          />
        </form>
      )}
    </PageContainer>
  )
}

export default SaveDepartment
