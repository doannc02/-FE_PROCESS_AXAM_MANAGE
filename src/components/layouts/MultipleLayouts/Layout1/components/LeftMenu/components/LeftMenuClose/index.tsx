import SwitchSystemIcon from '@/components/icons/SwitchSystemIcon'
import { listMenuRoutes } from '@/routes'
import { memo } from 'react'
import { useSetRecoilState } from 'recoil'
import { isOpenLeftMenuRecoil } from '../../recoil'
import MenuItemClose from './MenuItemClose'
import { MenuItemCloseWithChid } from './MenuItemCloseWithChid'

const LeftMenuClose = () => {
  const setIsOpenLeftMenu = useSetRecoilState(isOpenLeftMenuRecoil)

  return (
    <div className='z-100 relative flex flex-col h-full scale-100 cursor-pointer'>
      <div
        className='flex flex-col h-[45px] items-center justify-center'
        style={{
          transform: 'rotate(180deg)',
        }}
      >
        <SwitchSystemIcon
          onClick={() => {
            setIsOpenLeftMenu(true)
          }}
        />
      </div>

      <div
        className='flex flex-col overflow-y-auto w-25'
        style={{
          height: `calc( 100vh - 100px )`,
        }}
      >
        {listMenuRoutes.map((item, index) => {
          const child = [
            ...(item.children ? item.children : []),
            ...(item.subMenu ? item.subMenu : []),
          ]

          return child.length === 0 ? (
            <MenuItemClose key={index} item={item} />
          ) : (
            <MenuItemCloseWithChid key={index} item={item} />
          )
        })}
      </div>
    </div>
  )
}

export default memo(LeftMenuClose)
