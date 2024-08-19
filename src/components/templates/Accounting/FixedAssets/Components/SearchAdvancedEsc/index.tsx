import iconCancel from '@/assets/svg/iconCancel.svg'
import iconCustom from '@/assets/svg/iconCustom.svg'
import iconSearch from '@/assets/svg/iconSearch.svg'
import { CoreButton } from '@/components/atoms/CoreButton'
import { CoreDatePicker } from '@/components/atoms/CoreDatePicker'
import CoreInput from '@/components/atoms/CoreInput'
import {
  Box,
  ClickAwayListener,
  Fade,
  Grid,
  IconButton,
  Paper,
  Popper,
  Stack,
  Typography,
} from '@mui/material'
import Image from 'next/image'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'

type Props = {
  isShowSearchForDateTime?: boolean
  defaultValues?: any
  onSubmit: () => void
  onReset: () => void
}
const SearchAdvanced = (props: Props) => {
  const { defaultValues, onSubmit, onReset, isShowSearchForDateTime } = props

  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null)

  const handleClickAway = () => {
    setAnchorEl(null)
    //onReset()
  }

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget)
  }
  const openPoper = Boolean(anchorEl)

  const { watch, control, setValue, handleSubmit } = useFormContext()
  return (
    <div>
      <Popper
        sx={{ zIndex: 1200 }}
        open={openPoper}
        anchorEl={anchorEl}
        transition
        placement={'bottom-start'}
        className='max-w-[600px]'
      >
        {({ TransitionProps }) => (
          <ClickAwayListener onClickAway={handleClickAway}>
            <Fade {...TransitionProps} timeout={100}>
              <Paper>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Grid container className='w-full p-10'>
                    <Grid item xs={12}>
                      <Stack
                        direction='row'
                        justifyContent='space-between'
                        alignItems='center'
                        className='w-full'
                      >
                        <Typography fontSize='16px' fontWeight='700'>
                          Tìm kiếm nâng cao
                        </Typography>
                        <Box
                          sx={{
                            cursor: 'pointer',
                          }}
                        >
                          <Image
                            alt=''
                            src={iconCancel}
                            onClick={handleClickAway}
                          />
                        </Box>
                      </Stack>
                    </Grid>

                    {isShowSearchForDateTime && (
                      <>
                        <Grid
                          item
                          xs={12}
                          sm={12}
                          md={12}
                          lg={12}
                          className='pt-15'
                        >
                          <CoreDatePicker
                            control={control}
                            name='start'
                            title='Ngày bắt đầu'
                            placeholder='Chọn ngày bắt đầu'
                            format='YYYY-MM-DD'
                          />
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          sm={12}
                          md={12}
                          lg={12}
                          className='pt-15'
                        >
                          <CoreDatePicker
                            control={control}
                            name='end'
                            title='Ngày kết thúc'
                            placeholder='Chọn ngày bắt đầu'
                            format='YYYY-MM-DD'
                          />
                        </Grid>
                      </>
                    )}

                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={12}
                      lg={12}
                      className='pt-15'
                    >
                      <CoreInput
                        control={control}
                        name='search'
                        label='Tìm kiếm'
                        placeholder='Tìm kiếm theo mã hoặc tên'
                        InputProps={{
                          endAdornment: (
                            <IconButton>
                              <Image alt='' src={iconSearch} />
                            </IconButton>
                          ),
                        }}
                      />
                    </Grid>

                    {/* <Grid
                      item
                      xs={12}
                      sm={12}
                      md={12}
                      lg={12}
                      className='pt-15'
                    >
                      <CoreAutocomplete
                        options={[
                          { value: 'TOOLS', label: 'Công cụ' },
                          { value: 'ASSET', label: 'Tài sản' },
                        ]}
                        control={control}
                        name='toolAsset'
                        label='Loại TSCD'
                        placeholder='Chọn loại TSCD'
                      />
                    </Grid> */}

                    <Grid item xs={12} sm={12} md={4} lg={4}>
                      <div className='flex justify-center mt-10'>
                        <div className='m-5'>
                          <CoreButton onClick={onReset} theme='reset'>
                            Reset
                          </CoreButton>
                        </div>
                        <div className='m-5'>
                          <CoreButton theme='submit' type='submit'>
                            Tìm kiếm
                          </CoreButton>
                        </div>
                      </div>
                    </Grid>
                  </Grid>
                </form>
              </Paper>
            </Fade>
          </ClickAwayListener>
        )}
      </Popper>
      <CoreInput
        control={control}
        name='search'
        label='Tìm kiếm'
        placeholder={'Tìm kiếm theo tên hoặc mã'}
        InputProps={{
          startAdornment: (
            <IconButton>
              <Image alt='' src={iconSearch} className='mr-5' />
            </IconButton>
          ),
          endAdornment: (
            <IconButton>
              <Image alt='' src={iconCustom} />
            </IconButton>
          ),
        }}
        onClick={(e) => handleClick(e)}
      />
    </div>
  )
}

export default SearchAdvanced
