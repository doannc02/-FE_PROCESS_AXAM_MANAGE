import { BasicLayout } from '@/components/layouts/WrapLayout/BasicLayout'
import { Meta } from '@/components/meta'
import BankAndCashAccountList from '@/components/templates/Accounting/BankAndCashAccount/BankAndCashAccountList'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { TRANSLATE } from '@/routes'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <BankAndCashAccountList />

Page.getLayout = BasicLayout
Page.getMeta = Meta(() => ({ title: 'Cash Account List' }))

export const getServerSideProps = async ({ locale = 'vn' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        TRANSLATE.COMMON,
        TRANSLATE.BANK_CASH_ACCOUNT,
      ])),
    },
  }
}

export default Page
