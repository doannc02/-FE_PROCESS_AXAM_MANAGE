import { BasicLayout } from '@/components/layouts/WrapLayout/BasicLayout'
import { Meta } from '@/components/meta'
import SaveMajor from '@/components/templates/ProcessExam/Major/SaveMajor'
import { HttpResponse } from '@/lib/api'
import { combineGssp } from '@/lib/next/gssp/combineGssp'
import { authGssp } from '@/lib/next/gssp/middleware/authGssp'
import { NextPageWithLayout } from '@/lib/next/types'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<any>

const Page: NextPageWithLayout<Props> = () => <SaveMajor />

Page.getLayout = BasicLayout
Page.getMeta = Meta(() => ({ title: 'Thêm mới học phần' }))

export const getServerSideProps = combineGssp<any>(
  authGssp(),
  async ({ locale = 'vn' }) => ({
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  })
)

export default Page
