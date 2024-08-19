import { BasicLayout } from '@/components/layouts/WrapLayout/BasicLayout'
import { Meta } from '@/components/meta'
import SaveOtherDocument from '@/components/templates/Accounting/OtherDocument/SaveOtherDocument'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { TRANSLATE } from '@/routes'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <SaveOtherDocument />

Page.getLayout = BasicLayout
Page.getMeta = Meta(() => ({ title: 'Update Other Document' }))

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
