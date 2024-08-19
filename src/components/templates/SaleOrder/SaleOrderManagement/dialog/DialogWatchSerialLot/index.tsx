import { ColumnProps } from '@/components/organism/CoreTable'
import { DialogCustom } from '@/components/organism/DialogCustom'
import { CustomTable } from '@/components/organism/TableCustom'
import { useQueryGetSerialLots } from '@/service/warehouse/stockPickingOut/getSerialLots'
import { Box, Typography } from '@mui/material'
import { useMemo } from 'react'

interface Props {
  open: boolean
  onClose: () => void
  data: any
  type: 'SERIAL' | 'LOTS'
  unit?: string
  productId?: number
  locationId?: number
}

const DialogWatchSerialLot = (props: Props) => {
  const { data, onClose, open, type, unit, productId, locationId } = props

  const { data: serialLotsData } = useQueryGetSerialLots({
    locationId,
    productId,
  })

  const columns = useMemo(
    () =>
      [
        {
          fieldName: 'lotId',
          render: (val) => (
            <Typography>
              {serialLotsData?.find((v) => v.lotId === val.lotId)?.code}
            </Typography>
          ),
          header: type === 'SERIAL' ? 'Serial' : 'Số Lô',
        },
        ...(type === 'LOTS'
          ? [
              {
                fieldName: 'lotIds',
                header: 'Số lượng',
                render: (val: any) => (
                  <Typography variant='body2'>
                    {val?.doneQtyByLot}
                    &nbsp;
                    <span>{unit}</span>
                  </Typography>
                ),
              },
            ]
          : []),
      ] as ColumnProps[],
    [serialLotsData, type, unit]
  )
  return (
    <DialogCustom
      open={open}
      title={type === 'SERIAL' ? 'View theo Serial' : 'View theo số Lô'}
      onClose={onClose}
      // position='middle'
      width={1100}
    >
      <Box className='p-20'>
        <CustomTable
          columns={columns}
          data={serialLotsData ?? []}
          isShowColumnStt
        />
      </Box>
    </DialogCustom>
  )
}

export default DialogWatchSerialLot
