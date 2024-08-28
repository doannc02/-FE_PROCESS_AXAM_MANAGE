import { ColumnProps, CoreTable } from '@/components/organism/CoreTable'
import { CustomTable } from '@/components/organism/TableCustom'
import { PAGE_SIZE } from '@/helper/contain'
import { errorMsg } from '@/helper/message'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import CloseIcon from '@mui/icons-material/Close'
import {
  ClickAwayListener,
  Fade,
  IconButton,
  InputAdornment,
  Paper,
  Popper,
  TextField,
} from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import { useDebounce } from '@uidotdev/usehooks'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useController } from 'react-hook-form'

type Props = {
  params: any
  typePath: string
  onChangeValue?: (val: any) => void
  fetchDataFn: any
  labelPath: string
  valuePath: string
  control: any
  name: string
  className?: string
  label?: string | null
  placeholder?: string
  columns: ColumnProps[]
  disabled?: boolean
}

export const SelectBoxCustom = (props: Props) => {
  const {
    params,
    typePath,
    fetchDataFn,
    labelPath,
    valuePath,
    control,
    name,
    className,
    label,
    placeholder,
    columns,
    disabled = false,
    onChangeValue,
  } = props
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null)
  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClickAway = () => {
    setAnchorEl(null)
  }
  const openPoper = Boolean(anchorEl)
  const [page, setPage] = useState(0)
  const [isClick, setIsClick] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<any[]>([])
  const [totalPages, setTotalPages] = useState(0)
  const [search, setSearch] = useState<string | false>(false)
  const debounceSearch = useDebounce(search, 700)
  const tableEl = useRef<HTMLTableElement>()

  const handleSearchData = useCallback(async () => {
    setIsLoading(true)
    const data = await fetchDataFn(
      {
        page: 0,
        size: PAGE_SIZE,
        search: debounceSearch,
        ...(params ? params : {}),
      },
      typePath
    )

    if (data && Array.isArray(data.data.content)) {
      setData(() => [
        ...data.data.content.map((item: any) => ({
          ...item,
          [labelPath]: item[labelPath],
          [valuePath]: item[valuePath],
        })),
      ])
    }

    setIsLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceSearch, fetchDataFn, JSON.stringify(params)])

  const handleFetchData = useCallback(
    async (isPreApply: boolean, pageOption?: number) => {
      try {
        setIsLoading(true)
        const pageValue = pageOption ?? page

        if (pageValue !== 0 && pageValue >= totalPages) {
          setIsLoading(false)
          return
        }

        const data = await fetchDataFn(
          {
            page: pageValue,
            size: PAGE_SIZE,
            ...(params ? params : {}),
          },
          typePath
        )

        if (data && Array.isArray(data.data.content)) {
          setData((pre: any) => [
            ...(isPreApply ? pre : []),
            ...data.data.content.map((item: any) => ({
              ...item,
              [labelPath]: item[labelPath],
              [valuePath]: item[valuePath],
            })),
          ])
          setTotalPages(data.data.totalPages)
        }
        setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
        errorMsg(error)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [fetchDataFn, page, JSON.stringify(params), totalPages]
  )

  const clearValue = () => {
    onChange()
  }

  const onSelectValue = (val: any) => {
    onChange(val)
    setSearch('')
    handleClickAway()
  }

  useEffect(() => {
    try {
      if (isClick) handleFetchData(false)
    } catch (error) {
      errorMsg(error)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isClick, JSON.stringify(params)])

  const dataTable = useMemo(() => {
    const dataFormated = data.map((item:  any) => {
      const newDate: any = {
        ...item,
      }

      newDate.totalInventory = `${item?.warehouses?.reduce(
        (total: any, val: any) => {
          return total + val.quantity
        },
        0
      )} ${item?.uomGroup?.uomOriginName ?? ''}`

      // Take the warehouse id as the "key", inventory quantity as the value
      for (let index = 0; index < (item?.warehouses ?? []).length; index++) {
        newDate[
          item.warehouses[index].id
        ] = `${item?.warehouses[index].quantity} ${item?.uomGroup?.uomOriginName}`
      }

      return newDate
    })
    return dataFormated
  }, [data])

  useEffect(() => {
    if (isClick) {
      if (debounceSearch) {
        handleSearchData()
      } else {
        setPage(() => 0)
        handleFetchData(false, 0)
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceSearch, JSON.stringify(params)])

  const handleSCroll = useCallback(
    async (e: any) => {
      const listboxNode = e.currentTarget
      const currentHeight = listboxNode.scrollTop + listboxNode.clientHeight
      if (listboxNode.scrollHeight - currentHeight <= 1) {
        setPage((prev) => prev + 1)
        handleFetchData(true, page + 1)
      }
    },
    [page, handleFetchData]
  )

  useEffect(() => {
    const tableRef = tableEl.current
    if (tableRef) {
      tableRef.addEventListener('scroll', handleSCroll)
      return () => {
        tableRef.removeEventListener('scroll', handleSCroll)
      }
    }
  }, [tableEl, handleSCroll])

  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error },
  } = useController({ control, name })

  return (
    <div
      onClick={() => {
        setIsClick(true)
      }}
      className={className}
    >
      <Popper
        sx={{ zIndex: 1200 }}
        open={openPoper}
        anchorEl={anchorEl}
        placement={'bottom-start'}
        transition
        className='max-w-[1080px]'
      >
        {({ TransitionProps }) => (
          <ClickAwayListener onClickAway={handleClickAway}>
            <Fade {...TransitionProps} timeout={100}>
              <Paper>
                <CustomTable
                  maxHeight={216}
                  columns={columns}
                  data={dataTable}
                  paginationHidden
                  onReturnValueRow={(val) => {
                    if (onChangeValue) {
                      onChangeValue(val)
                    }
                    onSelectValue(val)
                  }}
                  stickyHeader={true}
                  // isAutocomplate={true}
                  refTableContainer={tableEl}
                />
              </Paper>
            </Fade>
          </ClickAwayListener>
        )}
      </Popper>
      <TextField
        disabled={disabled}
        className='border-none'
        value={!!search ? search : !!value ? value[labelPath] : ''}
        onClick={(e) => handleClick(e)}
        onChange={(e) => {
          setSearch(e.target.value)
          if (e.target.value === '') {
            clearValue()
          }
        }}
        variant='standard'
        ref={ref}
        fullWidth
        required
        label={label}
        placeholder={placeholder}
        InputProps={{
          endAdornment: !disabled ? (
            <InputAdornment position='end'>
              {isLoading ? (
                <CircularProgress size={16} />
              ) : !!value ? (
                <IconButton onClick={clearValue}>
                  <CloseIcon fontSize='small' />
                </IconButton>
              ) : null}
              <IconButton>
                <ArrowDropDownIcon />
              </IconButton>
            </InputAdornment>
          ) : null,
        }}
      />
    </div>
  )
}
