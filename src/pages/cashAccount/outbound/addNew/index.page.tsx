import { BasicLayout } from '@/components/layouts/WrapLayout/BasicLayout'
import { Meta } from '@/components/meta'
import SaveBankAndCashAccount from '@/components/templates/Accounting/BankAndCashAccount/SaveBankAndCashAccount'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { TRANSLATE } from '@/routes'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <SaveBankAndCashAccount />

Page.getLayout = BasicLayout
Page.getMeta = Meta(() => ({ title: 'Create Cash Account' }))

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
