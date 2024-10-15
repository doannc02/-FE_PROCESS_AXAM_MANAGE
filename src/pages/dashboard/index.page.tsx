import { BasicLayout } from '@/components/layouts/WrapLayout/BasicLayout'
import { Meta } from '@/components/meta'
import Dashboard from '@/components/templates/Dashboard'
import { HttpResponse } from '@/lib/api'
import { combineGssp } from '@/lib/next/gssp/combineGssp'
import { authGssp } from '@/lib/next/gssp/middleware/authGssp'
import { NextPageWithLayout } from '@/lib/next/types'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<any>

const Page: NextPageWithLayout<Props> = () => <Dashboard />

Page.getLayout = BasicLayout
Page.getMeta = Meta(() => ({ title: 'Dashboard Exam Process Manage Service' }))

export const getServerSideProps = combineGssp<any>(
  authGssp(),
  async ({ locale = 'vn' }) => ({
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  })
)

export default Page
