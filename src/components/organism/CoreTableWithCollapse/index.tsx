import { layoutType } from '@/components/layouts/MultipleLayouts/layoutTypeRecoil'
import { BACK_GROUND, WHITE } from '@/helper/colors'
import { useAppSelector } from '@/redux/hook'
import styled from '@emotion/styled'
import EmptyIcon from '@/components/icons/EmptyIcon'
import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableCellProps,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import _ from 'lodash'
import { useTranslation } from 'next-i18next'
import { ReactElement, ReactNode, useId } from 'react'
import { useRecoilValue } from 'recoil'
import PaginationCustom from '../PaginationCustom'
import { LineBody } from './LineBody'

export type ColumnProps = {
  header: ReactNode | string
  fieldName: string
  render?: (val: any, index: number) => ReactNode
  styleCell?: TableCellProps
}

export type PaginationTableProps = {
  page?: number
  size?: number
}

export type CoreTableProps = {
  tableName?: string
  className?: string
  data: Record<string, any>[]
  columns: ColumnProps[]
  page?: number
  size?: number
  totalPages?: number
  paginationHidden?: boolean
  isLoading?: boolean
  isShowColumnStt?: boolean
  stickyHeader?: boolean
  maxHeight?: number
  showInfoText?: boolean
  actionTable?: null | ReactElement
  onChangePageSize?: (val: PaginationTableProps) => void
  onRowClick?: (id: number, row?: any) => void
}

export const TableCellWithBorderRight = styled(TableCell)(() => ({
  borderRight: '1px solid #DFE0EB',
}))

export const TableHeadCommon = styled(TableHead)(
  ({ layout = 'Layout1' }: { layout?: 'Layout1' | 'Layout2' }) => ({
    backgroundColor: layout === 'Layout1' ? BACK_GROUND : WHITE,
    ...(layout === 'Layout1' ? {} : { borderBottom: '2px solid #A7A7A7' }),
  })
)

export const TableContainerCommon = styled(TableContainer)(
  ({ layout = 'Layout1' }: { layout?: 'Layout1' | 'Layout2' }) => ({
    boxShadow: 'none!important',
    borderRadius: layout === 'Layout1' ? '4px 4px 0px 0px' : '10px',
    ...(layout === 'Layout1' ? { border: '1px solid #DFE0EB' } : {}),
  })
)

export const CoreTableWithCollapse = ({
  className,
  tableName,
  data,
  columns,
  page = 0,
  size = 20,
  totalPages,
  paginationHidden,
  isLoading,
  isShowColumnStt = false,
  maxHeight,
  stickyHeader = false,
  subColumnName,
  tableHead,
  titleField = '',
  getTitleFieldFn,
  isTotalGroup = false,
  onChangePageSize,
  onRowClick,
}: CoreTableProps & {
  subColumnName: string
  titleField: string
  getTitleFieldFn?: any
  tableHead?: ReactNode
  isTotalGroup?: boolean
}) => {
  const { t } = useTranslation('common')
  const layout = useRecoilValue(layoutType)
  const key = useId()

  const dataColumn = isShowColumnStt
    ? [
        {
          header: t('table.no') ?? 'No',
          fieldName: 'index',
        },
        ...columns,
      ]
    : columns

  if (isShowColumnStt) {
    data = (data ?? []).map((item: any, index: number) => {
      const noNumber = page * size + index + 1
      return {
        ...item,
        index: noNumber > 9 ? noNumber : `0${noNumber}`,
      }
    })
  }

  const listTableCache = useAppSelector((state) => state.tableConfigData)
  const tableCurrent = listTableCache.find(
    (item) => item.tableName === tableName
  )
  const columnsChecked = tableCurrent
    ? tableCurrent.columns.map((item) =>
        dataColumn.find((ele) => ele.fieldName === item)
      )
    : dataColumn

  return (
    <div className={className}>
      <TableContainerCommon
        layout={layout}
        style={{
          maxHeight: `${maxHeight}px`,
        }}
      >
        <Table
          aria-label='sticky table'
          stickyHeader={stickyHeader}
          sx={{ minWidth: 650 }}
        >
          {tableHead ? (
            tableHead
          ) : (
            <TableHeadCommon layout={layout}>
              <TableRow>
                {_.map(columnsChecked, (column, index) => (
                  <TableCellWithBorderRight
                    align='center'
                    variant='head'
                    key={index}
                    {...(column?.styleCell ?? {})}
                    style={{
                      paddingTop: '1rem',
                      paddingBottom: '1rem',
                      minWidth: index !== 0 ? 200 : 60,
                      fontWeight: 600,
                      backgroundColor: '#f0f3f7',
                      ...column?.styleCell?.style,
                    }}
                  >
                    {column?.header}
                  </TableCellWithBorderRight>
                ))}
              </TableRow>
            </TableHeadCommon>
          )}

          {isLoading && (
            <TableBody>
              <TableRow>
                <TableCellWithBorderRight
                  colSpan={columnsChecked.length}
                  variant='body'
                >
                  <div className='flex justify-center min-h-[30px]'>
                    <CircularProgress />
                  </div>
                </TableCellWithBorderRight>
              </TableRow>
            </TableBody>
          )}

          {data.map((item, index) => (
            <LineBody
              key={`${key + index}`}
              item={item}
              titleField={titleField}
              getTitleFieldFn={getTitleFieldFn}
              subColumnName={subColumnName}
              columns={columnsChecked}
              onRowClick={onRowClick}
              isTotalGroup={isTotalGroup}
            />
          ))}

          {data.length === 0 && !isLoading && (
            <TableRow>
              <TableCell
                colSpan={columnsChecked.length}
                variant='body'
                align='center'
                className='py-8'
              >
                <div className='flex justify-center min-h-[60px] flex-col'>
                  <EmptyIcon />
                  <Typography variant='body2'>{t('table.no_data')}</Typography>
                </div>
              </TableCell>
            </TableRow>
          )}
        </Table>
      </TableContainerCommon>

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
    </div>
  )
}
