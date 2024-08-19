import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import TimeCounter from './TimeCounter'

const PageWelcome = () => {
  return (
    <div className='relative h-screen w-screen flex items-center justify-center'>
      <div className='h-30 w-full px-10 absolute top-0 left-0'>
        <CoreBreadcrumbs
          isShowDashboard
          breadcrumbs={[
            {
              title: 'ComingSoon',
            },
          ]}
        />
      </div>

      <div className='flex flex-col gap-10 items-center justify-center'>
        <TimeCounter />
      </div>
    </div>
  )
}

export default PageWelcome
