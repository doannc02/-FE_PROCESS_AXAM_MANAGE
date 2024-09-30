import { BasicLayout } from '@/components/layouts/WrapLayout/BasicLayout'
import { Meta } from '@/components/meta'
import SaveExamSet from '@/components/templates/ProcessExam/ExamSets/SaveExamSet'
import { HttpResponse } from '@/lib/api'
import { combineGssp } from '@/lib/next/gssp/combineGssp'
import { authGssp } from '@/lib/next/gssp/middleware/authGssp'
import { NextPageWithLayout } from '@/lib/next/types'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<any>

const Page: NextPageWithLayout<Props> = () => <SaveExamSet />

Page.getLayout = BasicLayout
Page.getMeta = Meta(() => ({ title: 'Chi tiết đề xuất' }))

export const getServerSideProps = combineGssp<any>(
  authGssp(),
  async ({ locale = 'vn' }) => ({
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  })
)

export default Page
