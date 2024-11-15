import CheckIcon from '@mui/icons-material/Check'
import MailIcon from '@mui/icons-material/Mail'
import MarkChatReadIcon from '@mui/icons-material/MarkChatRead'
import {
  Alert,
  AlertColor,
  Badge,
  Box,
  Fade,
  FormControlLabel,
  FormGroup,
  IconButton,
  Popper,
  Stack,
  Switch,
  Typography,
} from '@mui/material'
import { ReactNode, useState } from 'react'

import { CoreButton } from '@/components/atoms/CoreButton'
import { BLACK, GRAY_SCALE } from '@/helper/colors'
import { toast, TypeOptions } from 'react-toastify'
import { useNotificationCenter } from 'react-toastify/addons/use-notification-center'

const types = ['success', 'info', 'warning', 'error']

export default function Notifications() {
  const { notifications, clear, markAllAsRead, markAsRead, unreadCount } =
    useNotificationCenter()
  const [showUnreadOnly, setShowUnreadOnly] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const addNotification = () => {
    // use a random type of notification
    toast('Lorem ipsum dolor sit amet, consectetur adipiscing elit', {
      type: types[Math.floor(Math.random() * types.length)] as TypeOptions,
    })
  }

  const toggleNotificationCenter = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
    setIsOpen(!isOpen)
  }

  const toggleFilter = (e: React.ChangeEvent) => {
    setShowUnreadOnly(!showUnreadOnly)
  }

  return (
    <Box sx={{ margin: '8px' }}>
      <IconButton size='large' onClick={toggleNotificationCenter}>
        <Badge badgeContent={unreadCount} color='error'>
          <MailIcon color='action' />
        </Badge>
      </IconButton>
      <button onClick={addNotification}>Add notification</button>

      <Popper open={isOpen} anchorEl={anchorEl} transition>
        {({ TransitionProps }) => (
          <Fade
            style={{
              width: '85%',
              borderRadius: '8px',
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
            }}
            {...TransitionProps}
            timeout={350}
          >
            <Box
              sx={{
                borderRadius: '8px',
              }}
            >
              <Box
                sx={{
                  borderTopLeftRadius: '8px',
                  borderTopRightRadius: '8px',
                  background: '#ffff',
                  padding: '8px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Typography variant='h6' color={BLACK}>
                  Thông báo
                </Typography>
                <FormGroup sx={{ color: BLACK }}>
                  <FormControlLabel
                    control={
                      <Switch
                        color='secondary'
                        onChange={toggleFilter}
                        checked={showUnreadOnly}
                      />
                    }
                    label='Hiển thị chưa đọc'
                  />
                </FormGroup>
              </Box>
              <Stack
                sx={{
                  height: '400px',
                  padding: '12px',
                  background: GRAY_SCALE,
                  overflowY: 'auto',
                }}
                spacing={2}
              >
                {(!notifications.length ||
                  (unreadCount === 0 && showUnreadOnly)) && (
                  <div className='min-w-[400px] flex justify-center flex-col'>
                    <Typography variant='body2'>
                      Không có thông báo nào!!
                    </Typography>
                  </div>
                )}
                {(showUnreadOnly
                  ? notifications.filter((v) => !v.read)
                  : notifications
                ).map((notification) => {
                  return (
                    <Alert
                      key={notification.id}
                      severity={(notification.type as AlertColor) || 'info'}
                      action={
                        notification.read ? (
                          <CheckIcon />
                        ) : (
                          <CoreButton
                            color='primary'
                            aria-label='upload picture'
                            onClick={() => markAsRead(notification.id)}
                          >
                            <MarkChatReadIcon />
                          </CoreButton>
                        )
                      }
                    >
                      {notification?.content as ReactNode}
                    </Alert>
                  )
                })}
              </Stack>
              <Box
                sx={{
                  background: '#ffff',
                  padding: '8px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderBottomLeftRadius: '8px',
                  borderBottomRightRadius: '8px',
                }}
              >
                <CoreButton variant='contained' onClick={clear}>
                  Xóa tất cả
                </CoreButton>

                <CoreButton variant='contained' onClick={markAllAsRead}>
                  Đánh dấu đã đọc
                </CoreButton>
              </Box>
            </Box>
          </Fade>
        )}
      </Popper>
    </Box>
  )
}
