import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import { pricingConfig } from '@/enum'
import { Grid, Typography } from '@mui/material'
import React from 'react'

type Props = {
  name: string
  index: number
  control: any
  indexStock: number
}

export default function RenderLocation({
  name,
  index,
  control,
  indexStock,
}: Props) {
  return (
    <>
      <Grid item xs={12} sm={12} md={6} lg={6}>
        <Typography sx={{ marginBottom: '10px', marginTop: '1px' }}>
          Vị trí kho
        </Typography>
        <Typography>{name ?? ''}</Typography>
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6}>
        <CoreAutocomplete
          control={control}
          options={pricingConfig}
          name={`warehouses.${index}.locations.${indexStock}.pricingMethodType`}
          label='Phương pháp tính giá xuất kho'
          placeholder='Chọn phương pháp tính giá xuất kho'
          required
        />
      </Grid>
    </>
  )
}
