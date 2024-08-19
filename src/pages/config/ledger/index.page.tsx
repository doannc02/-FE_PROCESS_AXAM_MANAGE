import { BasicLayout } from '@/components/layouts/WrapLayout/BasicLayout'
import { Meta } from '@/components/meta'
import LedgerList from '@/components/templates/Accounting/V1/Ledger/LedgerList'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <LedgerList />

Page.getLayout = BasicLayout
Page.getMeta = Meta(() => ({ title: 'Account Ledger List' }))

export const getServerSideProps = async ({ locale = 'vn' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        'accounting/account-ledger',
      ])),
    },
  }
}

export default Page
