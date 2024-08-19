import { BasicLayout } from '@/components/layouts/WrapLayout/BasicLayout'
import { Meta } from '@/components/meta'
import PaymentTermList from '@/components/templates/Accounting/V1/PaymentTerm/PaymentTermList'
import { HttpResponse } from '@/lib/api'
import { combineGssp } from '@/lib/next/gssp/combineGssp'
import { authGssp } from '@/lib/next/gssp/middleware/authGssp'
import { NextPageWithLayout } from '@/lib/next/types'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <PaymentTermList />

Page.getLayout = BasicLayout
Page.getMeta = Meta(() => ({ title: 'Payment Term' }))

export const getServerSideProps = combineGssp<any>(
  authGssp(),
  async ({ locale = 'vn' }) => ({
    props: {
      ...(await serverSideTranslations(locale, ['common','accounting/payment-term'])),
    },
  })
)

export default Page