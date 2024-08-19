import { BasicLayout } from '@/components/layouts/WrapLayout/BasicLayout'
import { Meta } from '@/components/meta'
import SaveAccountLedger from '@/components/templates/Accounting/V1/Ledger/SaveLedger'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <SaveAccountLedger />

Page.getLayout = BasicLayout
Page.getMeta = Meta(() => ({ title: 'Update Ledger' }))

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
