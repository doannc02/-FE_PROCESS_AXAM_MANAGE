import { useState, useEffect } from 'react'
import {
  Alert,
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
import CheckIcon from '@mui/icons-material/Check'
import MailIcon from '@mui/icons-material/Mail'
import MarkChatReadIcon from '@mui/icons-material/MarkChatRead'
import { CoreButton } from '@/components/atoms/CoreButton'
import { BLACK, GRAY_SCALE } from '@/helper/colors'
import {
  useQueryGetNotificationByUserId,
  actionNotification,
} from '@/service/notification'
import { useMutation, useQueryClient } from 'react-query'
import { TypeNotification } from '@/service/notification/type'
import { MENU_URL } from '@/routes'
import { useRouter } from 'next/router'

export default function Notifications() {
  const [showUnreadOnly, setShowUnreadOnly] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [notifications, setNotifications] = useState<TypeNotification[]>([])
  const queryClient = useQueryClient()

  // Fetch notifications
  const { data, refetch } = useQueryGetNotificationByUserId(
    {
      size: 1,
      page: 20,
    },
    {
      cacheTime: 0,
      staleTime: 0,
    }
  )
  const { mutate } = useMutation(actionNotification, { onSuccess: refetch })
  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: ['api/v1/notification/get-by-user-id'],
    })
    refetch()
  }, [])
  useEffect(() => {
    if (data?.data.content) {
      setNotifications(data.data.content)
    }
  }, [data])

  // Toggle visibility of Notification Center
  const toggleNotificationCenter = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
    setIsOpen(!isOpen)
  }
  const router = useRouter()

  // Filter notifications based on "unread" status
  const filteredNotifications = showUnreadOnly
    ? notifications.filter((n) => !n.is_read)
    : notifications

  const unreadCount = notifications.filter((n) => !n.is_read).length

  return (
    <Box sx={{ margin: '8px 10px 8px 8px' }}>
      <IconButton size='large' onClick={toggleNotificationCenter}>
        <Badge badgeContent={unreadCount} color='error'>
          <MailIcon color='action' />
        </Badge>
      </IconButton>

      <Popper
        open={isOpen}
        anchorEl={anchorEl}
        transition
        placement="bottom-start"
        modifiers={[
          {
            name: 'offset',
            options: {
              offset: [0, 10], // Dịch xuống 10px
            },
          },
          {
            name: 'preventOverflow',
            options: {
              boundary: 'viewport',
            },
          },
        ]}
      >
        {({ TransitionProps }) => (
          <Fade
            style={{
              borderRadius: '8px',
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
            }}
            {...TransitionProps}
            timeout={150}
          >
            <Box sx={{ borderRadius: '8px', background: '#fff', minWidth: '300px' }}>
              <NotificationHeader
                showUnreadOnly={showUnreadOnly}
                onToggleFilter={() => setShowUnreadOnly(!showUnreadOnly)}
              />
              <NotificationList
                router={router}
                notifications={filteredNotifications}
                onMarkAsRead={(id) =>
                  mutate({ NotificationIds: [id], isRead: true, method: 'put' })
                }
              />
              <NotificationFooter
                notifications={notifications}
                onDeleteAll={() =>
                  mutate({
                    NotificationIds: notifications.map((n) => n.id),
                    method: 'delete',
                  })
                }
                onMarkAllAsRead={() =>
                  mutate({
                    NotificationIds: notifications.map((n) => n.id),
                    isRead: true,
                    method: 'put',
                  })
                }
              />
            </Box>
          </Fade>
        )}
      </Popper>
    </Box>
  )
}

// Header Component
const NotificationHeader = ({
  showUnreadOnly,
  onToggleFilter,
}: {
  showUnreadOnly: boolean
  onToggleFilter: () => void
}) => (
  <Box
    sx={{
      borderTopLeftRadius: '8px',
      borderTopRightRadius: '8px',
      background: '#ffff',
      padding: '8px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      minWidth: '300px',
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
            onChange={onToggleFilter}
            checked={showUnreadOnly}
          />
        }
        label='Chưa đọc'
      />
    </FormGroup>
  </Box>
)

// Notification List Component
const NotificationList = ({
  notifications,
  onMarkAsRead,
  router,
}: {
  notifications: TypeNotification[]
  onMarkAsRead: (id: number) => void
  router: any
}) => (
  <Stack
    sx={{
      height: '400px',
      width: '300px',
      padding: '12px',
      background: GRAY_SCALE,
      overflowY: 'auto',
    }}
    spacing={2}
  >
    {notifications.length === 0 && (
      <Typography variant='body2' textAlign='center'>
        Không có thông báo nào!!
      </Typography>
    )}
    {notifications.map((notification) => (
      <Alert
        className='cursor-pointer'
        key={notification.id}
        severity='info'
        action={
          notification.is_read ? (
            <CheckIcon />
          ) : (
            <CoreButton
              color='primary'
              onClick={(e) => {
                e.stopPropagation()
                onMarkAsRead(notification.id)
              }}
            >
              <MarkChatReadIcon />
            </CoreButton>
          )
        }
        onClick={() => {
          onMarkAsRead(notification.id)
          router.push({
            pathname: `${MENU_URL.PROPOSAL}/[id]`,
            query: {
              id: notification?.proposal?.id,
            },
          })
        }}
      >
        {notification.message}
        {notification?.proposal?.code && (
          <Typography fontWeight={500}>
            Mã đề xuất: {notification?.proposal?.code}
          </Typography>
        )}
      </Alert>
    ))}
  </Stack>
)

// Footer Component
const NotificationFooter = ({
  notifications,
  onDeleteAll,
  onMarkAllAsRead,
}: {
  notifications: TypeNotification[]
  onDeleteAll: () => void
  onMarkAllAsRead: () => void
}) => (
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
    {notifications.length > 0 ? (
      <>
        <CoreButton variant='contained' onClick={onDeleteAll}>
          Xóa tất cả
        </CoreButton>
        <CoreButton variant='contained' onClick={onMarkAllAsRead}>
          Đánh dấu đã đọc
        </CoreButton>
      </>
    ) : null}
  </Box>
)

