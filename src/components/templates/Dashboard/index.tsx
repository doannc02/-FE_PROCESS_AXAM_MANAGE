import PageContainer from '@/components/organism/PageContainer'
import { BLACK } from '@/helper/colors'
import { Typography } from '@mui/material'
import { useDashboard } from './useDashboard'
import LoadingPage from '@/components/atoms/LoadingPage'
import { FormProvider } from 'react-hook-form'
import CoreNavbar from '@/components/organism/CoreNavbar'
import General from './components/General'

const Dashboard = () => {
  const [, _] = useDashboard()
  async function getData() {
    const url = '/api/hello'
    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`)
      }

      const json = await response.json()
      console.log(json)
    } catch (error: any) {
      console.error(error.message)
    }
  }

  const [values, handles] = useDashboard()

  const { methodForm } = values

  const { onSubmit } = handles
  console.log('here !@!')
  getData()
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
                  rightAction: <>kkk</>,
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
