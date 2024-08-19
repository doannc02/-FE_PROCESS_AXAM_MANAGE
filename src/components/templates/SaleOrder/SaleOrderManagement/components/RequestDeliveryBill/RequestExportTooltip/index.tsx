import TooltipIcon from '@/components/icons/TooltipIcon'
import { Box, Grid, Tooltip, Typography } from '@mui/material'
import React from 'react'
import { Product } from '@/service/product/priceList/getProductOfListPrice/type'

type Props = {
  value: any
}

const RequestExportTooltip = (props: Props) => {
  const { value } = props
  const productInfo: Product = value?.productInfo
  const totalWeight =
    productInfo.baseProductPackingLine?.weight ?? 0 * value?.requestedQty
  return (
    <Box className='flex gap-5'>
      <Typography>{totalWeight}</Typography>
      <Tooltip
        componentsProps={{
          tooltip: {
            sx: {
              minWidth: '300px !important',
              bgcolor: '#fff',
              color: '#000',
              padding: '10px 12px',
              border: '1px solid #DFE0EB',
            },
          },
        }}
        placement='bottom-start'
        title={
          <Box
            className='flex justify-between gap-10'
            sx={{ overflow: 'auto', maxWidth: '500px' }}
          >
            <Grid sx={{ minWidth: '126px' }}>
              <Typography sx={{ fontWeight: '700', margin: '5px' }}>
                Tương đương ~
              </Typography>
              <Typography sx={{ margin: '5px' }}>Trọng lượng</Typography>
              <Typography sx={{ margin: '5px' }}>Thể tích</Typography>
            </Grid>
            <Box sx={{ borderRight: 'solid 1px #DFE0EB' }}></Box>
            <Box className='flex flex-row'>
              {(productInfo?.productPackingLines ?? []).map(
                (item, index: number) => {
                  let weight = item?.weight ?? 0
                  let amount =
                    !!item?.amount && item?.amount > 0 ? item.amount : 1
                  let volume = item?.volume ?? 0
                  let rate = value?.requestedQty ?? 0 / amount
                  return (
                    <Box key={index} sx={{ borderRight: 'solid 1px #DFE0EB' }}>
                      <Box sx={{ minWidth: '126px' }}>
                        <Typography sx={{ fontWeight: '700', margin: '8px' }}>
                          {value?.requestedQty / amount}
                          {item?.uomName}
                        </Typography>
                        <Typography sx={{ margin: '5px' }}>
                          {weight * rate}
                          kg
                        </Typography>
                        <Typography sx={{ margin: '5px' }}>
                          {volume * rate}
                          m3
                        </Typography>
                      </Box>
                    </Box>
                  )
                }
              )}
            </Box>
          </Box>
        }
      >
        <div>
          <TooltipIcon />
        </div>
      </Tooltip>
    </Box>
  )
}

export default RequestExportTooltip
