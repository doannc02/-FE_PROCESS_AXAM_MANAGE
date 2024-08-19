import { BasicLayout } from '@/components/layouts/WrapLayout/BasicLayout'
import { Meta } from '@/components/meta'
import BankAndCashAccountPrint from '@/components/templates/Accounting/BankAndCashAccount/BankAndCashPrint'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { TRANSLATE } from '@/routes'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <BankAndCashAccountPrint />

Page.getLayout = BasicLayout
Page.getMeta = Meta(() => ({ title: 'Bank Account Print' }))

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
