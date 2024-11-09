import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import { CoreButton } from '@/components/atoms/CoreButton'
import CoreInput from '@/components/atoms/CoreInput'
import CoreLoading from '@/components/molecules/CoreLoading'
import { TopAction } from '@/components/molecules/TopAction'
import CoreNavbar from '@/components/organism/CoreNavbar'
import PageContainer from '@/components/organism/PageContainer'
import { MENU_URL } from '@/routes'
import { Grid, Typography } from '@mui/material'
import useSaveAcademicYear from './useSaveAcademicYear'
import { CoreDatePicker } from '@/components/atoms/CoreDatePicker'
import DialogDeleteAcademic from '../DialogDeleteAcademic'

const SaveAcademicYear = () => {
  const [values, handles] = useSaveAcademicYear()
  const {
    isLoading,
    isLoadingSubmit,
    methodForm,
    isUpdate,
    isView,
    id,
    router,
  } = values
  const { onSubmit, t, showDialog } = handles

  const { control, watch } = methodForm
  return (
    <PageContainer
      title={
        <CoreBreadcrumbs
          isShowDashboard
          breadcrumbs={[
            {
              title: 'Danh sách năm học',
              pathname: MENU_URL.ACADEMIC,
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
                          <CoreDatePicker
                            control={control}
                            title='Năm học bắt đầu'
                            name='start_year'
                            views={['year']}
                            inputFormat='YYYY'
                            format='YYYY'
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
                          className='mt-70'
                        >
                          <CoreDatePicker
                            control={control}
                            title='Năm học kết thúc'
                            name='end_year'
                            views={['year']}
                            inputFormat='YYYY'
                            format='YYYY'
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
                          className='mt-70'
                        >
                          <CoreInput
                            control={control}
                            label='Tên năm học'
                            name='name'
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
                              router.push(MENU_URL.ACADEMIC)
                            }}
                          >
                            {t('common:btn.cancel')}
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
                    actionList={
                      [
                        ...(isUpdate
                          ? ['delete']
                          : isView
                          ? ['edit', 'delete']
                          : []),
                      ] as any
                    }
                    onEditAction={() => {
                      router.push({
                        pathname: `${MENU_URL.ACADEMIC}/[id]`,
                        query: {
                          id: Number(id),
                        },
                      })
                    }}
                    onDeleteAction={() => {
                      showDialog(
                        <DialogDeleteAcademic
                          nameCourse={watch('name')}
                          id={Number(id)}
                        />
                      )
                    }}
                  />
                ),
              },
            ]}
          />
        </form>
      )}
    </PageContainer>
  )
}

export default SaveAcademicYear
