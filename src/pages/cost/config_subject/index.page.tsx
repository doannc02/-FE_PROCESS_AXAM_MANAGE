import { BasicLayout } from '@/components/layouts/WrapLayout/BasicLayout'
import { Meta } from '@/components/meta'
import ConfigSubjectList from '@/components/templates/Accounting/ConfigSubject/ConfigSubjectList'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { TRANSLATE } from '@/routes'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <ConfigSubjectList />

Page.getLayout = BasicLayout
Page.getMeta = Meta(() => ({ title: 'THCP' }))

export const getServerSideProps = async ({ locale = 'vn' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        TRANSLATE.COMMON,
        TRANSLATE.THCP,
      ])),
    },
  }
}

export default Page
