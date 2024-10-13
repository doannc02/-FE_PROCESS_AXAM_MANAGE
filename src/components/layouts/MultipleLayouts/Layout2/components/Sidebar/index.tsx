import { GRAY } from '@/helper/colors'
import { ChevronFirstIcon, ChevronLastIcon } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useRecoilState } from 'recoil'
import { isOpenSidebar } from './recoil'

export default function Sidebar({ children }: any) {
  const [isOpen, setIsOpen] = useRecoilState(isOpenSidebar)
  const router = useRouter()

  return (
    <div
      style={{
        display: 'flex',
        background: GRAY,
        minWidth: isOpen ? '270px' : '64px',
        zIndex: 1001,
      }}
    >
      <aside className='h-screen w-full bg-[#F8F9FA]'>
        <nav className='h-full flex flex-col border-r shadow-sm'>
          <div className='flex justify-between items-center h-27 px-4 pt-4 mt-2'>
            {isOpen && (
              <div
                className='px-4'
                onClick={() => {
                  router.push('/dashboard')
                }}
              >
                <Image
                  alt=''
                  src={require('@/assets/svg/apodio_logo.svg')}
                  height={50}
                  width={160}
                />
              </div>
            )}
            <button
              onClick={() => setIsOpen((curr) => !curr)}
              className='rounded-lg bg-gray-50 hover:bg-gray-100 p-1 mx-5'
            >
              {isOpen ? <ChevronFirstIcon /> : <ChevronLastIcon />}
            </button>
          </div>

          <ul className='flex-1 px-5 overflow-x-hidden overflow-y-auto'>
            {children}
          </ul>
        </nav>
      </aside>
    </div>
  )
}
