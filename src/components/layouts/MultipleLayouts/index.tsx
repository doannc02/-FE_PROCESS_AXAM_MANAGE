import CoreLoading from '@/components/molecules/CoreLoading'
import dynamic from 'next/dynamic'

const multipleLayout = {
  Layout1: dynamic(
    () =>
      import('@/components/layouts/MultipleLayouts/Layout1/index').then(
        (component) => component.Layout1
      ),
    {
      ssr: false,
      loading: () => (
        <div className='h-screen flex items-center w-screen'>
          <CoreLoading />
        </div>
      ),
    }
  ),
  Layout2: dynamic(
    () =>
      import('@/components/layouts/MultipleLayouts/Layout2/index').then(
        (component) => component.Layout2
      ),
    {
      ssr: false,
      loading: () => (
        <div className='h-screen flex items-center w-screen'>
          <CoreLoading />
        </div>
      ),
    }
  ),
}

export type LayoutTypes = keyof typeof multipleLayout

export default multipleLayout
