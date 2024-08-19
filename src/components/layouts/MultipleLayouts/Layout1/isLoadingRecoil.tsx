import { atom } from 'recoil'

export const isLoadingRecoil = atom<boolean>({
  key: 'isLoadingRecoil',
  default: false,
})
