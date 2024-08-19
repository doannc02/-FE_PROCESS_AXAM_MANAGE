import { BasicLayout } from '@/components/layouts/WrapLayout/BasicLayout'
import { Meta } from '@/components/meta'
import AccountBalance from '@/components/templates/Accounting/Balance/AccountBalance/AccountBalanceList'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <AccountBalance />

Page.getLayout = BasicLayout
Page.getMeta = Meta(() => ({ title: 'Số dư tài khoản' }))

export const getServerSideProps = async ({ locale = 'vn' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        'accounting/account-balance',
      ])),
    },
  }
}

export default Page
