import { BLACK, WHITE } from '@/helper/colors'
import { useAppSelector } from '@/redux/hook'
import { MenuPathProps, TRANSLATE } from '@/routes'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import { Tooltip, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useCallback } from 'react'

type Props = {
  item: MenuPathProps
}

export const MenuItemLoop = ({ item }: Props) => {
  const { t } = useTranslation(TRANSLATE.COMMON)
  const router = useRouter()

  const groupMenuChecked = useCallback(
    (item: MenuPathProps): boolean => {
      if (item.isChecked) return router.asPath.startsWith(item.path)
      if (item.children || item.subMenu)
        return [
          ...(item.children ? item.children : []),
          ...(item.subMenu ? item.subMenu : []),
        ].some(
          (itemMenu) =>
            router.asPath.startsWith(itemMenu.path) ||
            groupMenuChecked(itemMenu)
        )
      else return router.asPath.startsWith(item.path)
    },
    [router.asPath]
  )

  const child = [
    ...(item.children ? item.children : []),
    ...(item.subMenu ? item.subMenu : []),
  ]

  const isGroupMenuChecked = groupMenuChecked(item)

  const { firstMainColor: GREEN_VIU } = useAppSelector(
    (state) => state.themeColorData
  )

  if (child.length === 0) {
    return (
      <div
        className='flex items-center h-18 hover:bg-cyan-50 group rounded-[8px] my-3 cursor-pointer'
        style={{
          color: isGroupMenuChecked ? GREEN_VIU : BLACK,
        }}
      >
        {isGroupMenuChecked ? (
          <div className='w-2 h-full bg-[#0078D4]' />
        ) : (
          <div className='w-2 h-full group-hover:bg-[#0078D4]' />
        )}

        <div
          className='flex gap-6 items-center h-full w-full pl-5'
          style={{
            color: isGroupMenuChecked ? GREEN_VIU : BLACK,
          }}
          onClick={() => {
            router.push(item.path)
          }}
        >
          <Typography
            variant='body1'
            style={{
              color: isGroupMenuChecked ? GREEN_VIU : BLACK,
            }}
          >
            {t(item.name)}
          </Typography>
        </div>
      </div>
    )
  }

  return (
    <Tooltip
      componentsProps={{
        transition: {
          style: {
            boxShadow: 'none',
            marginLeft: '-1px',
          },
        },
      }}
      title={
        <div className='flex flex-col min-w-[150px]'>
          <div className='flex h-18 items-center pl-4'>
            <Typography color={GREEN_VIU}>{t(item.name)}</Typography>
          </div>
          <div className='flex flex-col'>
            {child.map((ele) => {
              return <MenuItemLoop key={ele.name} item={ele} />
            })}
          </div>
        </div>
      }
      placement='right-start'
    >
      <div
        className='flex items-center min-w-[150px] h-18 hover:bg-cyan-50 rounded-[8px] my-3 overflow-x-hidden'
        style={{
          color: isGroupMenuChecked ? GREEN_VIU : BLACK,
        }}
      >
        <div
          className='w-2 h-18'
          style={{
            borderRadius: '4px 0px 0px 4px',
            backgroundColor: isGroupMenuChecked ? GREEN_VIU : WHITE,
          }}
        />

        <div className='flex gap-6 items-center justify-between h-full w-full pl-5'>
          <Typography
            variant='body1'
            style={{
              color: isGroupMenuChecked ? GREEN_VIU : BLACK,
            }}
          >
            {t(item.name)}
          </Typography>

          <KeyboardArrowRightIcon fontSize='small' />
        </div>
      </div>
    </Tooltip>
  )
}
