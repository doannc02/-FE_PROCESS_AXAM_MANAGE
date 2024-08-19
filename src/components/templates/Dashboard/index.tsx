import PageContainer from '@/components/organism/PageContainer'
import { BLACK } from '@/helper/colors'
import { Typography } from '@mui/material'
import { useDashboard } from './useDashboard'

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
  console.log('here !@!')
  getData()
  return (
    <PageContainer title=''>
      <div className='flex justify-center mt-[30px]'>
        <Typography fontSize={30} color={BLACK} fontWeight={700}>
          WELCOME TO ACCOUNTING SERVICE
        </Typography>
      </div>
    </PageContainer>
  )
}

export default Dashboard
