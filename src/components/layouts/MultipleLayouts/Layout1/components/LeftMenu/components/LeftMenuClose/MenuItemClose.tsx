import { BLACK, WHITE } from '@/helper/colors'
import { useAppSelector } from '@/redux/hook'
import { MenuPathProps, TRANSLATE } from '@/routes'
import { Tooltip, Typography, styled } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useCallback } from 'react'

interface Props {
  item: MenuPathProps
}

export const TooltipCustom = styled(Tooltip)(() => ({
  '.MuiTooltip-tooltipArrow': {
    backgroundColor: '#fff',
  },

  '.MuiTooltip-arrow': {
    backgroundColor: '#fff',
  },
}))

const MenuItemClose = ({ item }: Props) => {
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

  const isGroupMenuChecked = groupMenuChecked(item)

  const { firstMainColor: GREEN_VIU } = useAppSelector(
    (state) => state.themeColorData
  )

  return (
    <Tooltip
      title={
        <div className='min-h-[36px] w-[123px] flex justify-center flex-col'>
          <Typography
            variant='body1'
            style={{
              color: isGroupMenuChecked ? GREEN_VIU : BLACK,
            }}
          >
            {t(item.name)}
          </Typography>
        </div>
      }
      arrow
      placement='right'
      componentsProps={{
        tooltip: {
          sx: {
            bgcolor: 'white',
            '& .MuiTooltip-arrow': {
              color: 'white',
            },
          },
        },
      }}
    >
      <div
        className='relative flex items-center w-25 h-18 hover:bg-cyan-50 group rounded-[8px] my-3 overflow-x-hidden'
        style={{
          color: isGroupMenuChecked ? GREEN_VIU : BLACK,
        }}
        onClick={() => {
          router.push(item.path)
        }}
      >
        <div
          className='w-2 h-18'
          style={{
            borderRadius: '4px 0px 0px 4px',
            backgroundColor: isGroupMenuChecked ? GREEN_VIU : WHITE,
          }}
        />

        <div className='flex gap-6 items-center justify-center h-full w-full px-6 group-hover:text-[#0078D4]'>
          {item.icon}
        </div>
      </div>
    </Tooltip>
  )
}

export default MenuItemClose
