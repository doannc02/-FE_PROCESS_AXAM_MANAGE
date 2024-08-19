import { BasicLayout } from '@/components/layouts/WrapLayout/BasicLayout'
import { Meta } from '@/components/meta'
import SaveInvoice from '@/components/templates/Accounting/Invoice/SaveInvoice'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { TRANSLATE } from '@/routes'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <SaveInvoice />

Page.getLayout = BasicLayout
Page.getMeta = Meta(() => ({ title: 'Update Invoice' }))

export const getServerSideProps = async ({ locale = 'vn' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        TRANSLATE.COMMON,
        TRANSLATE.ACCOUNT_INVOICE,
      ])),
    },
  }
}

export default Page
