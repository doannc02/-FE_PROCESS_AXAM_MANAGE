import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import PageContainer from '@/components/organism/PageContainer'
import { MENU_URL } from '@/routes'
import { Typography } from '@mui/material'
import useSaveCourse from './useSaveCourse'
import LoadingPage from '@/components/atoms/LoadingPage'
import { FormProvider } from 'react-hook-form'
import CoreNavbar from '@/components/organism/CoreNavbar'
import { TopAction } from '@/components/molecules/TopAction'
import DialogDeleteCourse from '../DialogDeleteCourse'
import { CoreTable } from '@/components/organism/CoreTable'
import { ActionTable } from '@/components/organism/TableCustomDnd/ActionTable'
import { CoreButton } from '@/components/atoms/CoreButton'

const SaveCourse = () => {
  const [values, handles] = useSaveCourse()
  const {
    isLoading,
    isLoadingSubmit,
    methodForm,
    columns,
    tableData,
    isView,
    isUpdate,
    id,
    router,
  } = values
  const { append, onSubmit, t, showDialog } = handles
  return (
    <PageContainer
      title={
        <CoreBreadcrumbs
          isShowDashboard
          breadcrumbs={[
            {
              title: 'Danh sách học phần',
              pathname: MENU_URL.COURSE,
            },
            {
              title: (
                <Typography>
                  {isUpdate
                    ? isView
                      ? 'Chi tiết bộ đề '
                      : 'Chỉnh sửa bộ đề '
                    : t('common:btn.add') + ' bộ đề'}
                </Typography>
              ),
            },
          ]}
        />
      }
    >
      {isLoading ? (
        <LoadingPage />
      ) : (
        <FormProvider {...methodForm}>
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
                      <Typography className='py-5' variant='subtitle1'>
                        {isUpdate
                          ? 'Chi tiết học phần' +
                            ' ' +
                            methodForm.watch(`courses.0.name`)
                          : 'Thêm mới học phần'}
                      </Typography>
                      <CoreTable
                        isShowColumnStt
                        paginationHidden
                        columns={columns}
                        data={tableData}
                        isLoading={isLoading}
                        actionTable={
                          !isView && !isUpdate ? (
                            <ActionTable
                              append={append}
                              defaultValueLine={{
                                id: null,
                              }}
                            />
                          ) : null
                        }
                      />
                      <div>
                        {!isView ? (
                          <div className='space-x-12 text-center my-10'>
                            <CoreButton
                              theme='cancel'
                              onClick={() => {
                                router.push(MENU_URL.COURSE)
                              }}
                            >
                              {t('common:btn.cancel')}
                            </CoreButton>
                            <CoreButton theme='submit' type='submit'>
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
                          ...(isUpdate ? ['delete'] : []),
                          ...(isView ? ['delete', 'edit'] : []),
                        ] as any
                      }
                      onDeleteAction={() => {
                        showDialog(
                          <DialogDeleteCourse
                            nameCourse={methodForm.watch('courses.0.name')}
                            id={Number(id)}
                          />
                        )
                      }}
                      onEditAction={() => {
                        router.push({
                          pathname: `${MENU_URL.COURSE}/[id]`,
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
        </FormProvider>
      )}
    </PageContainer>
  )
}

export default SaveCourse
