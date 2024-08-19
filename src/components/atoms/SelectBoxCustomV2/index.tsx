import { PAGE_SIZE } from '@/helper/contain'
import { errorMsg } from '@/helper/message'
import { PageResponse } from '@/service/type'
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
import { useDebounce } from '@uidotdev/usehooks'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useController } from 'react-hook-form'
import CircularProgress from '@mui/material/CircularProgress'
import TableCustomCollapse2 from '../TableCustomCollapse'
import { useRouter } from 'next/router'
import { ColumnProps } from '@/components/organism/CoreTable'

type Props = {
  params?: any
  onChangeValue?: (val: any) => void
  fetchDataFn: (val: any) => Promise<PageResponse<any[]>>
  labelPath: string
  valuePath: string
  control: any
  name: string
  className?: string
  label?: string | null
  placeholder?: string
  columns: ColumnProps[]
  variant?: 'outlined' | 'filled' | 'standard'
  isViewProp?: boolean
  readOnly?: boolean
}

export const SelectBoxCustomV2 = (props: Props) => {
  const {
    params,
    fetchDataFn,
    labelPath,
    valuePath,
    control,
    name,
    className,
    label,
    placeholder,
    variant = 'outlined',
    columns,
    readOnly,
    onChangeValue,
    isViewProp,
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

  const router = useRouter()
  const { actionType } = router.query
  const isView = isViewProp !== undefined ? isViewProp : actionType === 'VIEW'

  const handleSearchData = useCallback(async () => {
    setIsLoading(true)
    const data = await fetchDataFn({
      page: 0,
      size: PAGE_SIZE,
      search: debounceSearch,
      ...(params ? params : {}),
    })

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

        const data = await fetchDataFn({
          page: pageValue,
          size: PAGE_SIZE,
          ...(params ? params : {}),
        })

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
    const dataFormated = data.map((item) => {
      return {
        id: item.id,
        code: item.code,
        name: item.name,
        child: item.child,
      }
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
        transition
        className='max-w-[600px] pr-27'
      >
        {({ TransitionProps }) => (
          <ClickAwayListener onClickAway={handleClickAway}>
            <Fade {...TransitionProps} timeout={100}>
              <Paper>
                <TableCustomCollapse2
                  data={dataTable}
                  isLoading={isLoading}
                  paginationHidden
                  onReturnValueRow={(val: any) => {
                    if (onChangeValue) {
                      onChangeValue(val)
                    }
                    onSelectValue(val)
                  }}
                />
              </Paper>
            </Fade>
          </ClickAwayListener>
        )}
      </Popper>
      <TextField
        value={!!search ? search : !!value ? value[labelPath] : ''}
        onClick={(e) => !isView && handleClick(e)}
        onChange={(e) => {
          setSearch(e.target.value)
          if (e.target.value === '') {
            clearValue()
          }
        }}
        variant='standard'
        ref={ref}
        fullWidth
        label={label}
        placeholder={isView ? '' : placeholder}
        inputProps={{
          readOnly: isView || readOnly,
        }}
        InputProps={{
          disableUnderline: isView ? true : false,
          endAdornment: !isView && (
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
          ),
        }}
      />
    </div>
  )
}
