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
import { ReactNode, useEffect, useState } from 'react'

import { CoreButton } from '@/components/atoms/CoreButton'
import { BLACK, GRAY_SCALE } from '@/helper/colors'
import { toast, TypeOptions } from 'react-toastify'
import { useNotificationCenter } from 'react-toastify/addons/use-notification-center'
import {
  actionNotification,
  useQueryGetNotificationByUserId,
} from '@/service/notification'
import { useMutation } from 'react-query'
import { TypeNotification } from '@/service/notification/type'
import { PageResponse } from '@/service/type'
import { errorMsg } from '@/helper/message'

const types = ['success', 'info', 'warning', 'error']

export default function Notifications() {
  // // const { notifications, clear, markAllAsRead, markAsRead, unreadCount } =
  //   useNotificationCenter()
  const [showUnreadOnly, setShowUnreadOnly] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [notifications, setNotifications] = useState<TypeNotification[]>()
  const toggleNotificationCenter = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
    setIsOpen(!isOpen)
  }
  console.log('notification')
  const toggleFilter = (e: React.ChangeEvent) => {
    setShowUnreadOnly(!showUnreadOnly)
  }

  const { data, refetch } = useQueryGetNotificationByUserId()

  const { mutate } = useMutation(actionNotification, {
    onSuccess: (res) => {
      if (res) {
        refetch()
      }
    },
    onError: (err) => {
      console.log(err, 'err notifi')
      refetch()
    },
  })
  useEffect(() => {
    if (data?.data.content) {
      console.log(data?.data.content, 'data')
      setNotifications(data?.data.content ?? [])
    }
  }, [data?.data.content])

  const unreadCount = Array.isArray(notifications)
    ? notifications.filter((n) => n.is_read === false).length
    : 0
  console.log(unreadCount, 'log un')
  return (
    <Box sx={{ margin: '8px' }}>
      <IconButton size='large' onClick={toggleNotificationCenter}>
        <Badge badgeContent={unreadCount} color='error'>
          <MailIcon color='action' />
        </Badge>
      </IconButton>

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
                {(notifications?.length === 0 ||
                  (unreadCount === 0 && showUnreadOnly)) && (
                  <div className='min-w-[400px] flex justify-center flex-col'>
                    <Typography variant='body2'>
                      Không có thông báo nào!!
                    </Typography>
                  </div>
                )}
                {(showUnreadOnly
                  ? (notifications ?? []).filter((v) => !v.is_read)
                  : notifications
                )?.map((notification) => {
                  return (
                    <Alert
                      key={notification.id}
                      severity='info'
                      action={
                        notification.is_read ? (
                          <CheckIcon />
                        ) : (
                          <CoreButton
                            color='primary'
                            aria-label='upload picture'
                            onClick={() => {
                              mutate({
                                NotificationIds: [Number(notification?.id)],
                                isRead: true,
                                method: 'put',
                              })
                            }}
                          >
                            <MarkChatReadIcon />
                          </CoreButton>
                        )
                      }
                    >
                      {notification?.message}
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
                <CoreButton
                  variant='contained'
                  onClick={async () => {
                    await mutate({
                      NotificationIds: (notifications ?? []).map((n) => n.id),
                      method: 'delete',
                    })
                  }}
                >
                  Xóa tất cả
                </CoreButton>

                <CoreButton
                  variant='contained'
                  onClick={async () => {
                    await mutate({
                      NotificationIds: (notifications ?? []).map((n) => n.id),
                      isRead: true,
                      method: 'put',
                    })
                  }}
                >
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
