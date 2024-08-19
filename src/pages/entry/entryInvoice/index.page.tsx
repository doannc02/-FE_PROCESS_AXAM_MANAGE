import { BasicLayout } from '@/components/layouts/WrapLayout/BasicLayout'
import { Meta } from '@/components/meta'
import EntryInvoiceList from '@/components/templates/Accounting/Entry/EntryInvoice/EntryInvoiceList'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <EntryInvoiceList />

Page.getLayout = BasicLayout
Page.getMeta = Meta(() => ({ title: 'Entry List' }))

export const getServerSideProps = async ({ locale = 'vn' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        'accounting/entry-invoice',
      ])),
    },
  }
}

export default Page
