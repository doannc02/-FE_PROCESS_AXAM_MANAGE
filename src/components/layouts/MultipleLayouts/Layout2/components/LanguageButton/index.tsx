import { WHITE } from '@/helper/colors'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { Box, ButtonBase, Menu, MenuItem, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import React from 'react'
import ReactCountryFlag from 'react-country-flag'
import { listLanguage } from './listLanguage'

const LanguageButton = () => {
  const { i18n } = useTranslation()
  const router = useRouter()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const currentLangue = listLanguage?.find(
    (v) => v.code.toLowerCase() === i18n.language
  )

  const changeLocale = (locale: string) => {
    router.push(router.asPath, router.asPath, { locale: locale })
    handleClose()
  }

  if (currentLangue)
    return (
      <Box>
        <ButtonBase className='p-2' onClick={handleClick}>
          <ReactCountryFlag
            countryCode={currentLangue?.flag}
            svg
            style={{ fontSize: '20px' }}
            className='w-10 h-10 mr-4'
          />
          <Typography
            className='p-1'
            variant='body2'
            style={{
              color: WHITE,
            }}
          >
            {currentLangue?.name}
          </Typography>

          {open ? (
            <KeyboardArrowUpIcon
              fontSize='small'
              style={{
                color: WHITE,
              }}
            />
          ) : (
            <KeyboardArrowDownIcon
              fontSize='small'
              style={{
                color: WHITE,
              }}
            />
          )}
        </ButtonBase>

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          {listLanguage.map((item, index) => {
            return (
              <MenuItem
                onClick={() => changeLocale(item.code.toLowerCase())}
                key={index}
              >
                <ReactCountryFlag
                  countryCode={item?.flag}
                  svg
                  style={{ fontSize: '20px' }}
                  className='w-10 h-10 mr-4'
                />
                <Typography variant='body2' className='p-2'>
                  {item?.name}
                </Typography>
              </MenuItem>
            )
          })}
        </Menu>
      </Box>
    )
  return null
}

export default LanguageButton
