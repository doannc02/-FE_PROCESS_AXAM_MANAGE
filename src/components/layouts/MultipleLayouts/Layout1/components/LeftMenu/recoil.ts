import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()

export const isOpenLeftMenuRecoil = atom({
  key: 'layout1/isOpenLeftMenu',
  default: true,
  effects_UNSTABLE: [persistAtom],
})

export const pathProjectRecoil = atom({
  key: 'layout1/path',
  default: '',
  effects_UNSTABLE: [persistAtom],
})
