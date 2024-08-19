import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import PageWithDetail from '@/components/organism/PageWithDetail'
import { Grid, IconButton, Typography } from '@mui/material'
import React, { useState } from 'react'
import useSavePricingConfig from './useSavePricingConfig'
import RenderWarehouse from './components/RenderWarehouse'
import { CoreButton } from '@/components/atoms/CoreButton'
import { FormProvider } from 'react-hook-form'
import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import { BLUE } from '@/helper/colors'
import Image from 'next/image'
import { MENU_URL } from '@/routes'
import useCheckPath from '@/components/hooks/path/useCheckPath'
import { getListFiscalYear } from '@/service/warehouse/pricingConfig/getListFiscalYear'
import { TopAction } from '@/components/molecules/TopAction'
import { useRouter } from 'next/router'

type Props = {}

export default function SavePricingConfig({}: Props) {
  const [values, handles] = useSavePricingConfig()
  const { methodForm, warehouses, actionType, defaultValues , isLoadingSubmit} = values
  const { append, remove, onSubmit, onCancel } = handles
  const { typeWareHouse } = useCheckPath()
  const router = useRouter()
  const id = Number(router.query?.id)
  const { control, watch, setValue } = methodForm
  const [deleteWarehouse, setDeleteWarehouse] = useState<number[]>([])
  return (
    <PageWithDetail
      title={
        <CoreBreadcrumbs
          isShowDashboard
          breadcrumbs={[
            {
              title: 'Phương pháp tính giá xuất kho',
              pathname: `${MENU_URL.WARE_HOUSE[typeWareHouse].PRICING_CONFIG}`,
            },
            {
              title: actionType !== 'VIEW' ? 'Thêm mới' : 'Chi tiết',
            },
          ]}
        />
      }
      topAction={
        <TopAction
          actionList={['edit']}
          onEditAction={() => {
            router.replace({
              pathname: `${MENU_URL.WARE_HOUSE[typeWareHouse].PRICING_CONFIG}/[id]`,
              query: {
                id: Number(id),
              },
            })
          }}
        />
      }
    >
      <FormProvider {...methodForm}>
        <form className='flex flex-col py-10 px-5' onSubmit={onSubmit}>
          <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <CoreAutoCompleteAPI
                control={control}
                name='fiscalYear'
                label='Năm tài chính'
                placeholder='Chọn năm tài chính'
                valuePath='id'
                labelPath='year'
                fetchDataFn={getListFiscalYear}
                params={{
                  isConfig: true,
                }}
                type={typeWareHouse}
                required
              />
            </Grid>
            {(warehouses ?? []).map((item: any, index: number) => {
              return (
                <>
                  <Grid item xs={12} sm={12} md={12} lg={11}>
                    <RenderWarehouse
                      warehouses={warehouses}
                      actionType={actionType}
                      index={index}
                      item={item}
                    />
                  </Grid>
                  {actionType !== 'VIEW' && (
                    <Grid item xs={12} sm={12} md={12} lg={1}>
                      <div className='mt-15 cursor-pointer'>
                        <IconButton
                          onClick={() => {
                            deleteWarehouse.push(item.warehouse?.id)
                            setValue('deleteWarehouseIds', deleteWarehouse)
                            remove(index)
                          }}
                        >
                          <Image
                            src={require('@/assets/svg/action/delete.svg')}
                            alt='delete'
                            width={16}
                            height={16}
                          />
                        </IconButton>
                      </div>
                    </Grid>
                  )}
                </>
              )
            })}

            {actionType !== 'VIEW' && (
              <Grid item xs={1}>
                <div className='flex items-center justify-center cursor-pointer'>
                  <Typography
                    color={BLUE}
                    onClick={() => {
                      append(defaultValues.warehouses[0])
                    }}
                  >
                    Thêm kho
                  </Typography>
                </div>
              </Grid>
            )}
          </Grid>
          {actionType !== 'VIEW' && (
            <div className='space-x-12 text-center my-15'>
              <CoreButton theme='cancel' onClick={onCancel}>
                Hủy
              </CoreButton>
              <CoreButton
                theme='submit'
                type='submit'
                loading={isLoadingSubmit}
              >
                Lưu thay đổi
              </CoreButton>
            </div>
          )}
        </form>
      </FormProvider>
    </PageWithDetail>
  )
}
