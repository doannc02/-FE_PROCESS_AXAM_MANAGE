import { atom } from 'recoil'

export const isOpenDialog = atom({
  key: 'hooks/dialog/isOpenDialog',
  default: false,
})

export const dialogNode = atom({
  key: 'hooks/dialog/dialogNode',
  default: undefined as JSX.Element | undefined,
})
