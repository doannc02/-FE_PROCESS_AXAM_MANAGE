import { BasicLayout } from '@/components/layouts/WrapLayout/BasicLayout'
import { Meta } from '@/components/meta'
import DebtReceivableInvoiceList from '@/components/templates/Accounting/Debt/DebtReceivableInvoice/DebtReceivableInvoiceList'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <DebtReceivableInvoiceList />

Page.getLayout = BasicLayout
Page.getMeta = Meta(() => ({ title: 'Công nợ phải thu' }))

export const getServerSideProps = async ({ locale = 'vn' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        'accounting/debt-receivable-invoice',
      ])),
    },
  }
}

export default Page
