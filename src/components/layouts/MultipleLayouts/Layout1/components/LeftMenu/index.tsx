import { Box, styled } from '@mui/material'
import MuiDrawer from '@mui/material/Drawer'
import { useRecoilValue } from 'recoil'
import LeftMenuClose from './components/LeftMenuClose'
import LeftMenuOpen from './components/LeftMenuOpen'
import { isOpenLeftMenuRecoil } from './recoil'

export const drawerWidth: number = 260

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    borderRight: 'none',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    }),
  },
}))

const LeftMenu = () => {
  const isOpenLeftMenu = useRecoilValue(isOpenLeftMenuRecoil)

  return (
    <div
      className='z-10 scale-100'
      style={{
        boxShadow: '5px 0px 8px rgba(0, 0, 0, 0.08)',
      }}
    >
      <Box position='sticky' top='0px'>
        <Drawer
          variant='permanent'
          open={isOpenLeftMenu}
          PaperProps={{
            style: {
              width: isOpenLeftMenu ? drawerWidth : '50px',
            },
          }}
        >
          {isOpenLeftMenu ? <LeftMenuOpen /> : <LeftMenuClose />}
        </Drawer> 
      </Box>
    </div>
  )
}

export default LeftMenu
