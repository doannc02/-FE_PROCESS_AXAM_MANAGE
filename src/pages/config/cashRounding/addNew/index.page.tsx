import { BasicLayout } from '@/components/layouts/WrapLayout/BasicLayout'
import { Meta } from '@/components/meta'
import SaveCashRounding from '@/components/templates/Accounting/V1/CashRounding/SaveCashRounding'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <SaveCashRounding />

Page.getLayout = BasicLayout
Page.getMeta = Meta(() => ({ title: 'Create Cash Rounding' }))

export const getServerSideProps = async ({ locale = 'vn' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        'accounting/cash-rounding',
      ])),
    },
  }
}

export default Page
