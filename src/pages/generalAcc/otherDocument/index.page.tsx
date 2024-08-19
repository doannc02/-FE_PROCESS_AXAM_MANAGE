import { BasicLayout } from '@/components/layouts/WrapLayout/BasicLayout'
import { Meta } from '@/components/meta'
import OtherDocumentList from '@/components/templates/Accounting/OtherDocument/OtherDocumentList'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { TRANSLATE } from '@/routes'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <OtherDocumentList />

Page.getLayout = BasicLayout
Page.getMeta = Meta(() => ({ title: 'Other Document' }))

export const getServerSideProps = async ({ locale = 'vn' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        TRANSLATE.COMMON,
        TRANSLATE.OTHER_DOCUMENT,
      ])),
    },
  }
}

export default Page
