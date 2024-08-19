import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'
import { LayoutTypes } from '.'

const { persistAtom } = recoilPersist()

export const layoutType = atom<LayoutTypes>({
  key: 'layouts/MultipleLayouts',
  default: 'Layout1',
  effects_UNSTABLE: [persistAtom],
})
