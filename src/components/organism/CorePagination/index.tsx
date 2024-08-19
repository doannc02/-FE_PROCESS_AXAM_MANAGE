import { Pagination } from '@mui/material'
import { memo } from 'react'

const CorePagination = ({
  className,
  currentPage,
  totalPages,
  onChangePage,
}: {
  className?: string
  currentPage: number
  totalPages: number
  onChangePage: (value: number) => void
}) => {
  return (
    <div className={className}>
      <Pagination
        color='primary'
        variant='text'
        onChange={(_, value) => {
          onChangePage(value)
        }}
        siblingCount={1}
        page={currentPage}
        count={totalPages}
      />
    </div>
  )
}

export default memo(CorePagination)
