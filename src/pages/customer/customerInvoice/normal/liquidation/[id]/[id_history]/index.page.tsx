import { BasicLayout } from '@/components/layouts/WrapLayout/BasicLayout'
import { Meta } from '@/components/meta'
import DetailHisUpdate from '@/components/templates/Accounting/Customer/CustomerInvoice/DetailHisUpdate'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <DetailHisUpdate />

Page.getLayout = BasicLayout
Page.getMeta = Meta(() => ({ title: 'History Update' }))

export const getServerSideProps = async ({ locale = 'vn' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common','accounting/account-history',])),
    },
  }
}

export default Page
