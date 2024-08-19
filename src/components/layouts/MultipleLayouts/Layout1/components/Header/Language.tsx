import { listLanguage } from '@/helper/listLanguage'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import TranslateOutlinedIcon from '@mui/icons-material/TranslateOutlined'
import { Menu, MenuItem, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import React from 'react'
import ReactCountryFlag from 'react-country-flag'

const Language = () => {
  const { i18n } = useTranslation()
  const router = useRouter()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget)
  }

  // const currentLangue = listLanguage?.find(
  //   (v) => v.code.toLowerCase() === i18n.language
  // )

  const changeLocale = (locale: string) => {
    router.push(router.asPath, router.asPath, { locale: locale })
  }

  return (
    <>
      <div onClick={(e: any) => setAnchorEl(e.currentTarget)}>
        <div className='flex items-center justify-between cursor-pointer group px-8'>
          <div className='flex gap-4 items-center'>
            <TranslateOutlinedIcon
              fontSize='small'
              className='group-hover:text-[#0078D4]'
            />
            <Typography variant='body2' className='group-hover:text-[#0078D4]'>
              Ngôn ngữ
            </Typography>
          </div>
          <KeyboardArrowRightIcon
            fontSize='small'
            className='group-hover:text-[#0078D4]'
          />
        </div>
      </div>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => {
          setAnchorEl(null)
        }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        classes={{
          root: '-ml-3',
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
    </>
  )
}

export default Language
