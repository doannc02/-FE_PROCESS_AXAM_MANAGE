import CoreLoading from '@/components/molecules/CoreLoading'
import { logoutAccount } from '@/config/axios'
import {
  BACK_GROUND,
  BLACK,
  BLUE,
  GRAY,
  GRAY_SCALE,
  GREEN,
  GREY,
  ORANGE,
  RED,
  WHITE,
} from '@/helper/colors'
import { useAppSelector } from '@/redux/hook'
import { TRANSLATE } from '@/routes'
import { useQueryGetCompanyOwningAndJoinList } from '@/service/apus/company/joinAndOwning'
import KeyIcon from '@mui/icons-material/Key'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined'
import SettingsIcon from '@mui/icons-material/Settings'
import { Avatar, IconButton, Menu, Radio, Typography } from '@mui/material'
import Link from 'next/link'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Language from './Language'
import { StateAccount } from './StateAccount'

export const AvatarCustom = ({
  username,
  lastName,
  firstName,
  companyName,
}: {
  username: string
  lastName: string
  firstName: string
  companyName: string
}) => {
  const { t } = useTranslation(TRANSLATE.COMMON)
  const { firstMainColor: PRIMARY } = useAppSelector(
    (state) => state.themeColorData
  )

  const { domain: currentDomain } = useAppSelector(
    (state) => state.companyConfigData
  )

  const shortName =
    firstName && lastName
      ? (firstName.at(0) ?? '') + (lastName.at(0) ?? '')
      : 'AD'

  const [anchorEl, setAnchorEl] = useState<any>(null)
  const [anchorEl1, setAnchorEl1] = useState<any>(null)

 // const { isLoading, data } = useQueryGetCompanyOwningAndJoinList()

  return (
    <>
      <div
        className='flex text-white items-center cursor-pointer'
        onClick={(e) => setAnchorEl(e.currentTarget)}
      >
        <div className='h-15 w-15 bg-white rounded-full flex items-center justify-center'>
          <div
            className='h-14 w-14 rounded-full flex items-center justify-center px-2'
            style={{
              backgroundColor: PRIMARY,
            }}
          >
            <Typography
              style={{
                color: WHITE,
                fontSize: 11,
              }}
            >
              {shortName}
            </Typography>
          </div>
        </div>
        <KeyboardArrowDownIcon
          fontSize='small'
          className='group-hover:text-[#0078D4]'
        />
      </div>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        classes={{
          root: 'mt-3',
        }}
      >
        <div className='flex flex-col w-147 h-200 m-2'>
          <div
            className='flex flex-col h-65 w-full px-8'
            style={{
              boxShadow: '0px 0px 8px 0px #0000000A',
            }}
          >
            <div className='w-full h-110 flex gap-4 items-center'>
              <div
                className='relative h-15 w-15 bg-white rounded-full flex items-center justify-center'
                style={{
                  backgroundColor: PRIMARY,
                }}
              >
                <StateAccount />

                <Typography
                  variant='body1'
                  style={{
                    color: WHITE,
                  }}
                >
                  {shortName}
                </Typography>
              </div>
              <div className='flex flex-col'>
                <Typography variant='body1'>
                  {firstName + ' ' + lastName}
                </Typography>
                <Typography
                  variant='body2'
                  style={{
                    paddingTop: '4px',
                  }}
                >
                  {companyName}
                </Typography>
                <Typography
                  variant='body2'
                  style={{
                    paddingTop: '4px',
                    color: '#747475',
                  }}
                >
                  {username}
                </Typography>
              </div>
            </div>

            <div className='w-full h-[1px] bg-[#DFE0EB] my-2'></div>

            <div
              className='w-full h-30 flex items-center pt-3 pb-3 cursor-pointer'
              onClick={(e) => setAnchorEl1(e.currentTarget)}
            >
              <Typography
                variant='body1'
                style={{
                  color: PRIMARY,
                }}
              >
                Xem tất cả workspace
              </Typography>
            </div>
            <Menu
              anchorEl={anchorEl1}
              open={Boolean(anchorEl1)}
              onClose={() => setAnchorEl1(null)}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              classes={{
                root: 'mr-25',
              }}
            >
              <div className='w-200 min-h-[100px] flex flex-col'>
                <div className='flex gap-4 items-center px-10 pt-4'>
                  <IconButton onClick={() => setAnchorEl1(null)}>
                    <KeyboardBackspaceIcon />
                  </IconButton>

                  <Typography variant='h6'>Lựa chọn workspace</Typography>
                </div>
                <div className='px-10 pb-10'>
                  {/* {isLoading ? (
                    <CoreLoading />
                  ) : (
                    data?.data.map((tenant) => {
                      return (
                        <Link
                          key={tenant.name}
                          className='flex gap-3 items-center my-3 justify-between'
                          href={`http://${tenant.domain}`}
                          rel='noopener'
                          style={{
                            textDecoration: 'none',
                            color: 'black',
                          }}
                        >
                          <div className='flex gap-4 items-center cursor-pointer'>
                            <Avatar
                              sx={{
                                bgcolor: [
                                  'red',
                                  'burlywood',
                                  'blue',
                                  'black',
                                  'red',
                                  'yellow',
                                  BLACK,
                                  RED,
                                  GRAY_SCALE,
                                  BACK_GROUND,
                                  BLUE,
                                  GREEN,
                                  GREY,
                                  ORANGE,
                                  GRAY,
                                ].at(Math.floor(Math.random() * 10)),
                                width: 25,
                                height: 25,
                                fontSize: 12,
                              }}
                            >
                              {tenant.name.slice(0, 2)?.toUpperCase()}
                            </Avatar>
                            <Typography>{tenant.name}</Typography>
                          </div>

                          <Radio
                            checked={tenant.domain === currentDomain}
                            value={tenant.domain}
                            name='radio-buttons'
                            inputProps={{ 'aria-label': 'A' }}
                            onClick={() =>
                              window.location.replace(`http://${tenant.domain}`)
                            }
                          />
                        </Link>
                      )
                    })
                  )} */}
                  <>Todo here!!!</>
                </div>
              </div>
            </Menu>
          </div>

          <div className='flex flex-col mt-10 gap-8'>
            <div className='flex gap-4 items-center cursor-pointer group px-8'>
              <ManageAccountsIcon
                fontSize='small'
                className='group-hover:text-[#0078D4]'
              />
              <Typography
                variant='body2'
                className='group-hover:text-[#0078D4]'
              >
                Thông tin cá nhân
              </Typography>
            </div>

            <div className='flex gap-4 items-center cursor-pointer group px-8'>
              <KeyIcon
                fontSize='small'
                className='group-hover:text-[#0078D4]'
                style={{
                  transform: 'rotate(135deg)',
                }}
              />
              <Typography
                variant='body2'
                className='group-hover:text-[#0078D4]'
              >
                Đổi mật khẩu
              </Typography>
            </div>

            <div className='flex gap-4 items-center cursor-pointer group px-8'>
              <ManageAccountsIcon
                fontSize='small'
                className='group-hover:text-[#0078D4]'
              />
              <Typography
                variant='body2'
                className='group-hover:text-[#0078D4]'
              >
                Quản lý thiết bị
              </Typography>
            </div>

            <div className='flex items-center justify-between cursor-pointer group px-8'>
              <div className='flex gap-4 items-center'>
                <SettingsIcon
                  fontSize='small'
                  className='group-hover:text-[#0078D4]'
                />
                <Typography
                  variant='body2'
                  className='group-hover:text-[#0078D4]'
                >
                  Cài đặt
                </Typography>
              </div>
              <KeyboardArrowRightIcon
                fontSize='small'
                className='group-hover:text-[#0078D4]'
              />
            </div>

            <Language />

            <div className='flex items-center justify-between cursor-pointer group px-8'>
              <div className='flex gap-4 items-center'>
                <SecurityOutlinedIcon
                  fontSize='small'
                  className='group-hover:text-[#0078D4]'
                />
                <Typography
                  variant='body2'
                  className='group-hover:text-[#0078D4]'
                >
                  Tài khoản và bảo mật
                </Typography>
              </div>
              <KeyboardArrowRightIcon
                fontSize='small'
                className='group-hover:text-[#0078D4]'
              />
            </div>
          </div>

          <div className='w-full my-7 px-8'>
            <div className='h-[1px] bg-[#DFE0EB] '></div>
          </div>

          <div
            className='w-full cursor-pointer flex items-center justify-center group'
            onClick={() => logoutAccount()}
          >
            <Typography
              variant='body1'
              style={{
                color: RED,
              }}
            >
              {t('logout')}
            </Typography>
          </div>
        </div>
      </Menu>
    </>
  )
}
