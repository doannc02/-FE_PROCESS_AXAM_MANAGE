import { Box } from '@mui/material'
import { ReactNode } from 'react'
import Footer from './components/Footer'
import Header from './components/Header'
import LeftMenu from './components/LeftMenu'
import { useRecoilValue } from 'recoil'
import { isLoadingRecoil } from './isLoadingRecoil'
import LoadingOverlay from 'react-loading-overlay-ts'

export const Layout1 = ({ children }: { children: ReactNode }) => {
  const isLoading = useRecoilValue(isLoadingRecoil)

  return (
    <LoadingOverlay active={isLoading} spinner text='Loading ...'>
      <Box className='flex flex-col flex-1 h-screen overflow-hidden'>
        <Header />

        <Box className='w-full flex' sx={{ maxHeight: `calc( 100vh - 45px )` }}>
          <LeftMenu />

          <Box
            className='flex flex-col w-full relative'
            sx={{
              height: `calc( 100vh - 45px )`,
              overflow: 'auto',
            }}
          >
            <Box className='w-full px-10'>{children}</Box>
            <Footer />
          </Box>
        </Box>
      </Box>
    </LoadingOverlay>
  )
}
