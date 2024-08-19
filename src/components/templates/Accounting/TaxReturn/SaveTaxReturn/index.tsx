import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import { CoreButton } from '@/components/atoms/CoreButton'
import CoreInput from '@/components/atoms/CoreInput'
import CoreLoading from '@/components/molecules/CoreLoading'
import { TopAction } from '@/components/molecules/TopAction'
import CoreNavbar from '@/components/organism/CoreNavbar'
import { CoreTable } from '@/components/organism/CoreTable'
import { CoreTableWithCollapse } from '@/components/organism/CoreTableWithCollapse'
import PageContainer from '@/components/organism/PageContainer'
import { taxReturnActionType, taxReturnState } from '@/enum'
import { PRIMARY } from '@/helper/colors'
import { MENU_URL } from '@/routes'
import { Checkbox, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { FormProvider } from 'react-hook-form'
import { Region } from './Region'
import { TaxInfo } from './TaxInfo'
import { TableHeadTaxReturn } from './component/TableHead'
import { useColumn } from './useColumn'
import { useSaveTaxReturn } from './useSaveTaxReturn'

export const SaveTaxReturn = () => {
  const [
    { id, isLoading, data, methodForm, isLoadingSubmit, isView, dataTable },
    { t, onCancel, onSubmit, showDialog },
  ] = useSaveTaxReturn()

  const { columns, columns2 } = useColumn()
  const router = useRouter()
  const { watch, control, setValue } = methodForm

  return (
    <PageContainer
      title={
        <div className='flex justify-between items-center'>
          <CoreBreadcrumbs
            isShowDashboard
            breadcrumbs={[
              {
                title: t('title'),
                pathname: MENU_URL.TAX_RETURN,
              },
              {
                title:
                  watch('taxReturnConfig')?.name + ' - ' + watch('value01b'),
              },
            ]}
          />

          <CoreBreadcrumbs
            breadcrumbs={taxReturnState.map((ele, index) => ({
              title: (
                <Typography
                  sx={{
                    color: watch('state') === ele.value ? PRIMARY : undefined,
                  }}
                >
                  {`${index + 1}. ${ele.label}`}
                </Typography>
              ),
            }))}
          />
        </div>
      }
    >
      <CoreNavbar
        breadcrumbs={[
          {
            title: 'Chi tiết',
            rightAction: isView ? (
              <TopAction
                actionList={['delete', 'edit']}
                onEditAction={() => {
                  router.push({
                    pathname: `${MENU_URL.TAX_RETURN}/[id]`,
                    query: {
                      id,
                    },
                  })
                }}
              ></TopAction>
            ) : null,
            content: isLoading ? (
              <div className='flex justify-center items-center h-full min-h-[600px]'>
                <CoreLoading />
              </div>
            ) : (
              <FormProvider {...methodForm}>
                <form className='flex flex-col' onSubmit={onSubmit}>
                  <div className='flex flex-col items-center justify-center gap-5'>
                    <Typography variant='h6'>
                      {watch('taxReturnConfig')?.name ?? 'Tờ khai thuế'}
                    </Typography>
                    <Typography my={1}>
                      (Áp dụng đối với người nộp thuế theo phương pháp khấu trừ
                      có hoạt động sản xuất kinh doanh)
                    </Typography>

                    <div className='flex justify-between min-w-[700px] mt-8 gap-15'>
                      <Typography>
                        [01a] Tên hoạt động sản xuất kinh doanh
                      </Typography>

                      <div className='min-w-[280px]'>
                        <Typography>
                          {taxReturnActionType.find(
                            (ele) => ele.value === watch('value01a')
                          )?.label ?? ''}
                        </Typography>
                      </div>
                    </div>

                    <div className='flex justify-between min-w-[700px] mt-8 gap-15'>
                      <Typography>
                        {`[01b] Kỳ tính thuế: ${watch('value01b') ?? ''}`}
                      </Typography>
                      <Typography></Typography>
                    </div>
                    <div className='flex justify-between items-center min-w-[700px] mt-2 gap-15'>
                      <div className='flex gap-5 justify-center items-center'>
                        <Typography>[02] Lần đầu:</Typography>
                        <Checkbox checked></Checkbox>
                      </div>

                      <div className='min-w-[280px]'>
                        <Typography>{`[03] Bổ sung lần thứ ${
                          watch('value03') ?? ''
                        }`}</Typography>
                      </div>
                    </div>
                  </div>

                  <div className='flex flex-col mt-8 gap-5'>
                    <div className='flex gap-5'>
                      <Typography mt={0.5}>[04] Tên người nộp thuế:</Typography>
                      <Typography mt={0.5} variant='subtitle1'>
                        {watch('value04') ?? ''}
                      </Typography>
                    </div>

                    <div className='flex gap-5 mt-8'>
                      <Typography mt={0.5}>[05] Mã số thuế:</Typography>
                      <Typography mt={0.5}>{watch('value05') ?? ''}</Typography>
                    </div>

                    <div className='flex gap-5 mt-8 items-center'>
                      <Typography mt={0.5}>[06] Tên đại lý thuế:</Typography>

                      {!isView ? (
                        <CoreInput
                          name='value06'
                          control={control}
                          placeholder={'Nhập tên đại lý thuế'}
                        />
                      ) : (
                        <Typography mt={0.5}>{watch('value06')}</Typography>
                      )}
                    </div>

                    <div className='flex gap-5 mt-8 items-center'>
                      <Typography mt={0.5}>[07] Mã số đại lý thuế:</Typography>

                      {!isView ? (
                        <CoreInput
                          name='value07'
                          control={control}
                          placeholder={'Nhập mã số đại lý thuế'}
                        />
                      ) : (
                        <Typography mt={0.5}>
                          {watch('value07') ?? ''}
                        </Typography>
                      )}
                    </div>
                    <div className='flex gap-5 mt-8 items-center'>
                      <Typography>[08] Hợp đồng đại lý thuế:</Typography>

                      {!isView ? (
                        <CoreInput
                          name='value08'
                          control={control}
                          placeholder={'Nhập tên hợp đồng'}
                        />
                      ) : (
                        <Typography>{watch('value08') ?? ''}</Typography>
                      )}

                      <div className='min-w-[100px] ml-15'>
                        <Typography mt={0.5}>Số</Typography>
                      </div>

                      <div className='min-w-[100px]'>
                        <Typography mt={0.5}>Ngày</Typography>
                      </div>
                    </div>

                    <div className='flex gap-5 mt-8 items-center'>
                      <Typography mt={0.5}>
                        [09] Tên đơn vị phụ thuộc/địa điểm kinh doanh của hoạt
                        động sản xuất kinh doanh khác tỉnh nơi đóng trụ sở
                        chính:
                      </Typography>

                      {!isView ? (
                        <CoreInput
                          name='value09'
                          placeholder={'Nhập tên đơn vị'}
                          control={control}
                        />
                      ) : (
                        <Typography mt={0.5}>{watch('value09')}</Typography>
                      )}
                    </div>

                    <div className='flex gap-5 mt-8 items-center'>
                      <Typography mt={0.5}>
                        [10] Mã số thuế đơn vị phụ thuộc/Mã số địa điểm kinh
                        doanh:
                      </Typography>

                      {!isView ? (
                        <CoreInput
                          name='value10'
                          placeholder={'Nhập mã số thuế'}
                          control={control}
                        />
                      ) : (
                        <Typography mt={0.5}>{watch('value10')}</Typography>
                      )}
                    </div>

                    <Region />

                    <div className='flex flex-row-reverse mt-8'>
                      <Typography>Đồng Việt Nam</Typography>
                    </div>

                    <CoreTable
                      data={dataTable}
                      columns={columns}
                      paginationHidden
                    />

                    <div className='flex flex-col gap-10 mt-10'>
                      <Typography variant='subtitle1'>
                        Nhân viên đại lý thuế
                      </Typography>
                      <TaxInfo />
                    </div>
                  </div>

                  {!isView && (
                    <div className='space-x-12 text-center my-15'>
                      <CoreButton theme='cancel' onClick={onCancel}>
                        {t('common:btn.cancel')}
                      </CoreButton>

                      <CoreButton
                        theme='submit'
                        type='submit'
                        loading={isLoadingSubmit}
                      >
                        {t('common:btn.save_change')}
                      </CoreButton>
                    </div>
                  )}
                </form>
              </FormProvider>
            ),
          },

          ...(data?.addendumList && data.addendumList.length > 0
            ? data.addendumList.map((item) => ({
                title: item.code,
                content: (
                  <FormProvider {...methodForm} key={item.id}>
                    <div className='flex flex-col gap-12'>
                      <div className='flex justify-center'>
                        <Typography variant='subtitle1'>
                          {item?.name}
                        </Typography>
                      </div>

                      <CoreTableWithCollapse
                        key={item.id}
                        columns={columns2}
                        tableHead={
                          <TableHeadTaxReturn
                            addendumType={item.addendumType}
                          />
                        }
                        data={item?.taxAddendumTypeResponses ?? []}
                        titleField='type'
                        subColumnName='taxAddendumLineResponses'
                        paginationHidden
                        isTotalGroup
                      />
                    </div>
                  </FormProvider>
                ),
              }))
            : []),
        ]}
      />
    </PageContainer>
  )
}
