import { isLoadingRecoil } from '@/components/layouts/MultipleLayouts/Layout1/isLoadingRecoil'
import { useSetRecoilState } from 'recoil'

type AsyncCallback = (data: any) => Promise<void>

export const useLoading = () => {
  const setLoading = useSetRecoilState(isLoadingRecoil)

  const executeWithLoading = (callback: AsyncCallback) => {
    return async (data: any) => {
      setLoading(true)
      try {
        await callback(data)
      } finally {
        setTimeout(() => setLoading(false), 800)
      }
    }
  }

  return { setLoading, executeWithLoading }
}
