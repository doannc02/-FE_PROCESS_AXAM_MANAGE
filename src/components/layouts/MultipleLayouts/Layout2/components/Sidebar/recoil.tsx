import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()

export const isOpenSidebar = atom<boolean>({
  key: 'Layout3/Sidebar/isOpenSidebar',
  default: false,
  effects_UNSTABLE: [persistAtom],
})
