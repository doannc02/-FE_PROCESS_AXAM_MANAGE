import { MenuPathProps } from '@/routes'
import { Link } from '@mui/material'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { useRecoilValue } from 'recoil'
import { isOpenSidebar } from '../Sidebar/recoil'

export function SidebarItem({ item }: { item: MenuPathProps }) {
  const { t } = useTranslation('common')
  const { icon, name, path } = item
  const isOpen = useRecoilValue(isOpenSidebar)

  const router = useRouter()
  const active = router.asPath.startsWith(path)

  if (true)
    return (
      <Link
        href={path}
        style={{
          textDecoration: 'none',
          marginTop: 10,
        }}
        className={`
        relative flex items-center p-5
        font-medium rounded-lg cursor-pointer
        transition-colors group h-22
        ${
          active
            ? 'bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800'
            : 'hover:bg-indigo-50 text-gray-600'
        }
        
    `}
      >
        {icon}
        <span
          className={`overflow-hidden transition-all ${
            isOpen ? 'min-w-[200px] ml-5' : 'w-0'
          }`}
        >
          {t(name)}
        </span>

        {active && (
          <div
            className={`absolute right-4 w-2 h-2 rounded bg-indigo-400 ${
              isOpen ? '' : 'top-3'
            }`}
          />
        )}

        {!isOpen && (
          <div
            className='absolute z-50 left-full rounded-md px-2 py-1 ml-6
          bg-indigo-100 text-indigo-800 text-sm
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0 w-30'
          >
            {t(name)}
          </div>
        )}
      </Link>
    )

  return <></>
}
