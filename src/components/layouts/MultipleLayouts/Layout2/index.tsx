import { GRAY } from '@/helper/colors'
import {
  listMenuForAdminRoutes,
  listMenuForUserRoutes,
  TRANSLATE,
} from '@/routes'
import { Box } from '@mui/material'
import { ReactNode } from 'react'
import Footer from './components/Footer'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import { SidebarItem } from './components/SidebarItem'
import { getRole } from '@/config/token'

export const Layout2 = ({ children }: { children: ReactNode }) => {
  const role = getRole()
  const listMenuRoutes =
    role === 'Admin' ? listMenuForAdminRoutes : listMenuForUserRoutes
  return (
    <Box className='flex flex-col flex-1 h-screen overflow-hidden'>
      <Box className='w-full flex h-full' sx={{ zIndex: 600 }}>
        <Sidebar>
          {listMenuRoutes.map((item, index) => {
            return <SidebarItem key={index} item={item} />
          })}
        </Sidebar>

        <Box
          className='w-full relative'
          sx={{
            height: '100vh',
            overflow: 'auto',
            zIndex: 2,
          }}
        >
          <Box sx={{ position: 'sticky', top: 0, zIndex: 600 }}>
            <Header />
          </Box>
          <Box
            sx={{
              minHeight: `calc( 100vh - 120px)`,
              backgroundColor: GRAY,
            }}
          >
            {children}
          </Box>
          <Footer />
        </Box>
      </Box>
    </Box>
  )
}
