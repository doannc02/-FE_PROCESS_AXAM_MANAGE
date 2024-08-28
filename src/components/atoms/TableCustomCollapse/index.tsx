import PaginationCustom from '@/components/organism/PaginationCustom'
import { ExpandLess, ExpandMore } from '@mui/icons-material'
import {
  CircularProgress,
  Collapse,
  ListItemText,
  TableCell,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const HeaderTable = () => {
  return (
    <div
      className='bg-rounder flex'
      style={{
        background: '#F6F7FB',
      }}
    >
      <TableCell className='w-1/2' variant='head'>
        Mã Đối Tượng
      </TableCell>
      <TableCell className='w-1/2' variant='head'>
        Tên Đối Tượng
      </TableCell>
    </div>
  )
}

const BodyTable = ({
  isLoading,
  data,
  onRowClick,
  showInfoText = true,
  onReturnValueRow,
}: {
  isLoading: boolean
  data: any[]
  onRowClick?: (id: number, row?: any) => void
  showInfoText?: boolean
  onReturnValueRow?: (val: any) => any
}) => {
  const { t } = useTranslation()
  return isLoading ? (
    <>
      <div className='flex justify-center min-h-[30px]'>
        <CircularProgress />
      </div>
    </>
  ) : data?.length === 0 ? (
    showInfoText ? (
      <div className='flex'>
        <TableCell variant='body' align='center' className='py-8 w-full'>
          <Typography variant='body1'>{t('table.no_data')}</Typography>
        </TableCell>
      </div>
    ) : null
  ) : (
    <div className='flex cursor-pointer w-full'>
      <div className='block w-full'>
        {data.map((item, index) => {
          return (
            <LineByLine
              arr={item}
              level={1}
              index={index}
              key={index}
              onRowClick={onRowClick}
              onReturnValueRow={onReturnValueRow}
            />
          )
        })}
      </div>
    </div>
  )
}

type PaginationTableProps = {
  page?: number
  size?: number
}

const TableCustomCollapse2 = ({
  isLoading,
  data,
  onRowClick,
  onChangePageSize,
  page = 0,
  size = 20,
  paginationHidden,
  totalPages,
  onReturnValueRow,
}: {
  isLoading: boolean
  data: any[]
  onRowClick?: (id: number, row?: any) => void
  onChangePageSize?: (val: PaginationTableProps) => void
  paginationHidden?: boolean
  page?: number
  size?: number
  totalPages?: number
  onReturnValueRow?: (val: any) => any
}) => {
  return (
    <>
      <div
        className='w-full mt-15 max-h-[300px] overflow-auto'
        style={{
          boxShadow: 'none!important',
          borderRadius: '4px 4px 0px 0px',
          border: '1px solid #DFE0EB',
        }}
      >
        <HeaderTable />
        <BodyTable
          data={data}
          isLoading={isLoading}
          onRowClick={onRowClick}
          onReturnValueRow={onReturnValueRow}
        />
      </div>
      {!paginationHidden && (
        <div className='py-5'>
          <PaginationCustom
            size={size ?? 1}
            page={page ?? 1}
            totalPages={totalPages ?? 1}
            onChangePagination={(val: any) =>
              onChangePageSize && onChangePageSize(val)
            }
          />
        </div>
      )}
    </>
  )
}

const LineByLine = ({
  arr,
  index,
  level,
  onRowClick,
  onReturnValueRow,
}: {
  arr: any
  index: any
  level: any
  onRowClick?: (id: number, row?: any) => void
  onReturnValueRow?: (val: any) => any
}) => {
  const [open, setOpen] = useState<boolean>(false)
  const width = window.innerWidth.toString() + 'px'

  return (
    <div className='flex w-full cursor-pointer'>
      <div style={{ width: width }}>
        <RowData
          nameRow='code'
          row={arr}
          key={index}
          level={level}
          open={open}
          setOpen={setOpen}
          onRowClick={onRowClick}
          onReturnValueRow={onReturnValueRow}
        />
      </div>
    </div>
  )
}

export const RowData = ({
  row,
  onRowClick,
  level,
  nameRow,
  open,
  setOpen,
  onReturnValueRow,
}: {
  row: any
  onRowClick?: any
  level: number
  nameRow: string
  open: boolean
  setOpen: any
  onReturnValueRow?: (val: any) => any
}) => {
  const [openChild, setOpenChild] = useState<boolean>(false)

  if (row?.child?.length === 0) {
    return (
      <div className='block hover:bg-[#F6F7FB]'>
        <TableCell
          variant='body'
          style={{
            display: 'flex',
          }}
          className='justify-start w-full'
          onDoubleClick={() => {
            onRowClick && onRowClick(row.id)
          }}
          onClick={() => {
            if (onReturnValueRow) {
              onReturnValueRow(row)
            }
            setOpenChild(!openChild)
          }}
        >
          <div style={{ width: '100%', height: '100%' }}>
            <ListItemText
              primary={row['code']}
              className='h-full w-full'
              style={{
                paddingLeft: nameRow === 'code' ? level * 20 : 0,
              }}
            />
          </div>
          <ListItemText primary={row['name'] ?? ''} className='h-full w-full' />
        </TableCell>
      </div>
    )
  }

  return (
    <>
      <div className='block'>
        <TableCell
          variant='body'
          style={{
            display: 'flex',
          }}
          className='justify-start w-full hover:bg-[#F6F7FB]'
          onDoubleClick={() => {
            onRowClick && onRowClick(row.id)
            if (onReturnValueRow) {
              onReturnValueRow(row)
            }
          }}
          onClick={() => {
            setOpen(!open)
          }}
        >
          <div className='h-full w-1/2 flex items-center'>
            <div
              style={{
                // paddingLeft: nameRow === 'code' ? level * 0 : 0,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {row?.child?.length > 0 && open ? <ExpandLess /> : <ExpandMore />}
            </div>
            <ListItemText className='h-full w-1/2'>{row['code']}</ListItemText>
          </div>
          <ListItemText className='h-full w-1/2'>{row['name']}</ListItemText>
        </TableCell>

        {row?.child?.length > 0 && (
          <Collapse in={open}>
            {row?.child?.map((item: any, index: number) => {
              return (
                <div key={index}>
                  <RowData
                    open={openChild}
                    setOpen={setOpenChild}
                    nameRow={nameRow}
                    row={item}
                    level={level + 1}
                    onRowClick={onRowClick}
                    onReturnValueRow={onReturnValueRow}
                  />
                </div>
              )
            })}
          </Collapse>
        )}
      </div>
    </>
  )
}

export default TableCustomCollapse2
