import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import useCheckPath from '@/components/hooks/path/useCheckPath'
import { getDetailStockWarehouse } from '@/service/warehouse/getDetail'
import { getWarehouseList } from '@/service/warehouse/getList'
import { RequestBody } from '@/service/warehouse/pricingConfig/save/type'
import { Grid } from '@mui/material'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import RenderLocation from './RenderLocation'
import { useRouter } from 'next/router'

type Props = {
  index: number
  actionType: any
  warehouses: any
  item: any
}

export default function RenderWarehouse({
  index,
  actionType,
  warehouses,
  item,
}: Props) {
  const { typeWareHouse } = useCheckPath()
  const methodForm = useFormContext<RequestBody['SAVE']>()
  const router = useRouter()
  const id = Number(router.query?.id)
  const { control, setValue, watch } = methodForm
  console.log('xxxx')

  const stockLocations = watch(`warehouses.${index}.locations`)

  const exceptValues = (watch(`warehouses`) ?? []).map((i) => {
    return {
      id: i.warehouse?.id,
      name: i.warehouse?.name,
    }
  })

  return (
    <>
      <div
        style={{
          border: '1px solid #DFE0EB',
          padding: 20,
          marginBottom: '10px',
        }}
      >
        <Grid container spacing={{ xs: 1, sm: 2, md: 3 }} key={item?.id}>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <CoreAutoCompleteAPI
              fetchDataFn={getWarehouseList}
              control={control}
              name={`warehouses.${index}.warehouse`}
              label='Kho áp dụng'
              placeholder='Chọn kho áp dụng'
              type={typeWareHouse}
              required
              exceptValues={exceptValues}
              valuePath='id'
              labelPath='name'
              onChangeValue={async (val) => {
                if (val) {
                  const res = await getDetailStockWarehouse(
                    { id: val?.id },
                    typeWareHouse
                  )
                  const stockLocationsItem = res.stockLocations.filter(
                    (word) => word.type === 'STORAGE_OF_GOODS'
                  )
                  stockLocationsItem.map((item, index2) => {
                    setValue(
                      `warehouses.${index}.locations.${index2}.location`,
                      item
                    )
                    setValue(
                      `warehouses.${index}.locations.${index2}.pricingMethodType`,
                      item.removalStrategyType
                    )
                  })
                  setValue(
                    `warehouses.${index}.stockLocations`,
                    res.stockLocations
                  )
                }
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <CoreAutocomplete
              control={control}
              options={[
                { label: 'Theo tháng', value: 'MONTH' },
                { label: 'Theo ngày', value: 'DAY' },
              ]}
              name={`warehouses.${index}.cycleType`}
              label='Chu kỳ tính giá xuất kho'
              placeholder='Chọn chu kỳ tính giá xuất kho'
              required
            />
          </Grid>
          {(stockLocations ?? []).map((itemStock, indexStock) => {
            const name = watch(
              `warehouses.${index}.locations.${indexStock}.location`
            )?.name
            return (
              <RenderLocation
                name={name}
                index={index}
                indexStock={indexStock}
                control={control}
                key={itemStock.id}
              />
            )
          })}
        </Grid>
      </div>
    </>
  )
}
