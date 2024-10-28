import LoadingPage from '@/components/atoms/LoadingPage'
import CoreNavbar from '@/components/organism/CoreNavbar'
import PageContainer from '@/components/organism/PageContainer'
import { BLACK } from '@/helper/colors'
import { Typography } from '@mui/material'
import { FormProvider } from 'react-hook-form'
import General from './components/General'
import { useDashboard } from './useDashboard'

const Dashboard = () => {
  const [, _] = useDashboard()

  const [values, handles] = useDashboard()

  const { methodForm } = values

  const { onSubmit } = handles

  return (
    <PageContainer title=''>
      <div className='flex justify-center mt-[30px]'>
        <Typography fontSize={30} color={BLACK} fontWeight={700}>
          DASHBOARD
        </Typography>
      </div>
      {false ? (
        <LoadingPage />
      ) : (
        <FormProvider {...methodForm}>
          <form onSubmit={onSubmit}>
            <CoreNavbar
              breadcrumbs={[
                {
                  title: 'HOME',
                  content: <General />,
                  rightAction: null,
                },
              ]}
              //  tabNumber={tabNumber}
            />
          </form>
        </FormProvider>
      )}
    </PageContainer>
  )
}

export default Dashboard
