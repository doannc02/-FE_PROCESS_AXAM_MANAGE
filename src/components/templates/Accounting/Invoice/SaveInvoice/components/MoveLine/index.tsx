import { CoreTable } from '@/components/organism/CoreTable'
import { Grid } from '@mui/material'
import { useMoveLine } from './useMoveLine'

export const MoveLine = () => {
  const [{ moveLinesColumns, moveLinesTableData }] = useMoveLine()
  return (
    <Grid
      container
      spacing={{ xs: 1, sm: 2, md: 3 }}
      style={{ marginBottom: '40px' }}
    >
      <Grid item xs={12}>
        <CoreTable
          tableName='saveRefundInv'
          columns={moveLinesColumns}
          data={moveLinesTableData}
          paginationHidden
        />
      </Grid>
    </Grid>
  )
}
