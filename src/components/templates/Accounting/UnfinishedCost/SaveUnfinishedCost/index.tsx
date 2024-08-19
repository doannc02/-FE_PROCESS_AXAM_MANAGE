import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import { CoreButton } from '@/components/atoms/CoreButton'
import CoreInput from '@/components/atoms/CoreInput'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import { TopAction } from '@/components/molecules/TopAction'
import CoreNavbar from '@/components/organism/CoreNavbar'
import PageContainer from '@/components/organism/PageContainer'
import { MENU_URL } from '@/routes'
import { Grid } from '@mui/material'
import { useRouter } from 'next/router'
import { subjectType } from '@/enum'
import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import { PageResponse } from '@/service/type'
import { CoreTable } from '@/components/organism/CoreTable'
import { getProcessProduct } from '@/service/manufactory/productProcess/getList'
import useSaveUnfinishedCost from './useSaveUnfinishedCost'
import { ActionTable } from '@/components/organism/TableCustomDnd/ActionTable'

const SaveUnfinishedCost = () => {
  const [
    {
      id,
      name,
      isUpdate,
      isLoadingSubmit,
      isView,
      methodForm,
      columns,
      tableData,
    },
    { t, onSubmit, onCancel, setValue, append },
  ] = useSaveUnfinishedCost()

  const { control, watch } = methodForm

  const router = useRouter()
  const { actionType } = router.query
  const { showDialog } = useDialog()

  return (
    <PageContainer
      title={
        <div className='flex justify-between items-center'>
          <CoreBreadcrumbs
            isShowDashboard
            breadcrumbs={[
              {
                title: 'Chi phí dở dang',
                pathname: MENU_URL.COST.UNFINISHED_COST,
              },
              {
                title: isUpdate ? 'Chỉnh sửa' : t('common:btn.add'),
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
                  isView
                    ? ['edit', 'delete']
                    : router.pathname.includes('addNew')
                    ? []
                    : ['delete']
                }
                onEditAction={() => {
                  router.replace({
                    pathname: `${MENU_URL.COST.UNFINISHED_COST}/[id]`,
                    query: {
                      id,
                      typeAddNew: watch('subjectType'),
                    },
                  })
                }}
              />
            ),
            content: (
              <form
                className='block bg-[#ffffff] mt-15 rounded-xl mx-auto'
                onSubmit={onSubmit}
              >
                <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
                  {isUpdate ? null : (
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                      <CoreAutocomplete
                        control={control}
                        name='subjectType'
                        label={'Phương pháp tính giá'}
                        options={subjectType}
                        isViewProp={true}
                        onChangeValue={(val) => {
                          //  alert(val)
                          // if (
                          //   val === 'STEP_STOOL_PRODUCTION' ||
                          //   watch('subjectType') === 'STEP_STOOL_PRODUCTION'
                          // ) {
                          //   setValue('data', [
                          //     {
                          //       subjectType: val as any,
                          //       stages: [
                          //         {
                          //           stage: null,
                          //         },
                          //       ],
                          //       process: null,
                          //     } as unknown as any,
                          //   ] as any[])
                          // } else {
                          setValue('data', [
                            {
                              subjectType: val as any,

                              process: null,
                            } as unknown as any,
                          ] as any[])
                        }}
                      ></CoreAutocomplete>
                    </Grid>
                  )}

                  {watch('subjectType') === 'STEP_STOOL_PRODUCTION' && (
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                      <CoreAutoCompleteAPI
                        control={control}
                        name='process'
                        label='Quy trình'
                        placeholder='Chọn quy trình sản xuất'
                        fetchDataFn={getProcessProduct}
                        params={{
                          isActive: true,
                          state: 'PUBLIC',
                        }}
                        onChangeValue={(val) => {
                          if (val) {
                            setValue(`data.${0}.stages`, [
                              {
                                stage: null,
                              },
                            ])
                          }
                        }}
                      />
                    </Grid>
                  )}
                </Grid>

                <div>
                  <CoreTable
                    paginationHidden
                    className='mt-15'
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
                            stage: null,
                          }}
                        />
                      ) : null
                    }
                  />
                </div>

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

export default SaveUnfinishedCost
