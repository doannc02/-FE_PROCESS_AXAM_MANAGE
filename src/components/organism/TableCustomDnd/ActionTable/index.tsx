import { GREEN_VIU } from '@/helper/colors'
import { TableCell, TableRow, Typography } from '@mui/material'

type Props = {
  columns?: any
  append: any
  defaultValueLine: any
  action?: string
  handleAppend?: any
}

export const ActionTable = ({
  columns,
  append,
  defaultValueLine,
  action = 'Thêm dòng',
  handleAppend,
}: Props) => {
  return (
    <TableRow>
      <TableCell colSpan={columns?.length + 1}>
        <div className='flex items-center gap-10 h-15 px-2'>
          <Typography
            variant='body1'
            style={{
              color: GREEN_VIU,
              cursor: 'pointer',
            }}
            onClick={() => {
              append(defaultValueLine)
              handleAppend && handleAppend()
            }}
            
          >
            {action}
          </Typography>
        </div>
      </TableCell>
    </TableRow>
  )
}
