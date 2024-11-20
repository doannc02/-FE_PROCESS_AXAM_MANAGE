import { CommonObject } from '../type'

export type TypeNotification = {
  id: number
  user_id: number
  title: string
  message: string
  avatar: string
  created_at: string
  is_read: boolean
  proposal: CommonObject
}
