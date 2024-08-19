import { BasicLayout } from '@/components/layouts/WrapLayout/BasicLayout'
import { Meta } from '@/components/meta'
import SavePaymentTerm from '@/components/templates/Accounting/V1/PaymentTerm/SavePaymentTerm'
import { SaleOrderManagement } from '@/components/templates/SaleOrder/SaleOrderManagement'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <SaleOrderManagement />

Page.getLayout = BasicLayout
Page.getMeta = Meta(() => ({ title: 'List' }))

export const getServerSideProps = async ({ locale = 'vn' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        'accounting/payment-term',
      ])),
    },
  }
}

export default Page
