import SwitchSystemIcon from '@/components/icons/SwitchSystemIcon'
import { BLACK } from '@/helper/colors'
import { useAppSelector } from '@/redux/hook'
import { MenuPathProps, TRANSLATE } from '@/routes'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import { Collapse, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'
import { useSetRecoilState } from 'recoil'
import { isOpenLeftMenuRecoil } from '../../recoil'

interface Props {
  item: MenuPathProps
  setMenuList?: any
  setTitleSubMenu?: any
}

const MenuItemOpen = (props: Props) => {
  const { t } = useTranslation(TRANSLATE.COMMON)
  const { item, setMenuList, setTitleSubMenu } = props
  const router = useRouter()

  const setIsOpenLeftMenu = useSetRecoilState(isOpenLeftMenuRecoil)

  const [open, setOpen] = useState(false)

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
      return router.asPath.startsWith(item.path)
    },
    [router.asPath]
  )

  const isGroupMenuChecked = groupMenuChecked(item)

  const { firstMainColor: GREEN_VIU } = useAppSelector(
    (state) => state.themeColorData
  )

  if (item.subMenu) {
    return (
      <div>
        <div
          className='flex items-center h-18 hover:bg-cyan-50 group rounded-[8px] my-3 cursor-pointer'
          style={{
            color: isGroupMenuChecked ? GREEN_VIU : BLACK,
          }}
          onClick={() => {
            setMenuList(item.subMenu)
            setTitleSubMenu(item.name)
          }}
        >
          {isGroupMenuChecked ? (
            <div className='w-2 h-full rounded-l-[4px] bg-[#16a34a]' />
          ) : (
            <div className='w-2 h-full rounded-l-[4px] group-hover:bg-[#16a34a]' />
          )}

          <div className='flex gap-6 items-center h-full w-full pl-5 group-hover:text-[#16a34a]'>
            {item.icon}

            <Typography variant='body1'>{t(item.name)}</Typography>
          </div>

          <KeyboardArrowRightIcon fontSize='small' />
        </div>
      </div>
    )
  }

  if (item.children) {
    return (
      <div>
        <div
          className='flex items-center h-18 hover:bg-cyan-50 group rounded-[8px] my-3 cursor-pointer'
          style={{
            color: isGroupMenuChecked ? GREEN_VIU : BLACK,
          }}
          onClick={() => {
            console.log(item)
            item.isChecked && router.push(item.path)
            setOpen(!open)
          }}
        >
          {isGroupMenuChecked ? (
            <div className='w-2 h-full rounded-l-[4px] bg-[#16a34a]' />
          ) : (
            <div className='w-2 h-full rounded-l-[4px] group-hover:bg-[#16a34a]' />
          )}

          <div className='flex gap-6 items-center h-full w-full pl-5 group-hover:text-[#16a34a]'>
            {item.icon}

            <Typography variant='body1'>{t(item.name)}</Typography>
          </div>

          <KeyboardArrowDownIcon
            fontSize='small'
            style={{ transform: open ? 'rotate(180deg)' : undefined }}
          />
        </div>

        <Collapse in={open} style={{ paddingLeft: 25 }}>
          {item.children.map((item: any, index: number) => {
            return <MenuItemOpen key={index} item={item} />
          })}
        </Collapse>
      </div>
    )
  }

  return (
    <div
      className='flex items-center h-18 hover:bg-cyan-50 group rounded-[8px] my-3 cursor-pointer'
      style={{
        color: isGroupMenuChecked ? GREEN_VIU : BLACK,
      }}
    >
      {isGroupMenuChecked ? (
        <div className='w-2 h-full rounded-l-[4px] bg-[#16a34a]' />
      ) : (
        <div className='w-2 h-full rounded-l-[4px] group-hover:bg-[#16a34a]' />
      )}

      <div
        className='flex gap-6 items-center h-full w-full pl-5 group-hover:text-[#16a34a]'
        onClick={() => {
          router.push(item.path)
        }}
      >
        {item.icon}

        <Typography variant='body1'>{t(item.name)}</Typography>
      </div>
      {['/dashboard', '/dashboard'].includes(item.path) && (
        <SwitchSystemIcon
          onClick={() => {
            setIsOpenLeftMenu(false)
          }}
        />
      )}
    </div>
  )
}

export default MenuItemOpen
