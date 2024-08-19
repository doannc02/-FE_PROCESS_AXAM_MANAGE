import { BasicLayout } from '@/components/layouts/WrapLayout/BasicLayout'
import { Meta } from '@/components/meta'
import SaveTax from '@/components/templates/Accounting/V1/Tax/SaveTax'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { TRANSLATE } from '@/routes'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <SaveTax />

Page.getLayout = BasicLayout
Page.getMeta = Meta(() => ({ title: 'Create Tax' }))

export const getServerSideProps = async ({ locale = 'vn' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        TRANSLATE.COMMON,
        TRANSLATE.TAX,
      ])),
    },
  }
}

export default Page
