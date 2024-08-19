import { BasicLayout } from '@/components/layouts/WrapLayout/BasicLayout'
import { Meta } from '@/components/meta'
import COPBalanceList from '@/components/templates/Accounting/Balance/COPBalance/COPBalanceList'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <COPBalanceList />

Page.getLayout = BasicLayout
Page.getMeta = Meta(() => ({ title: 'Số dư công nợ' }))

export const getServerSideProps = async ({ locale = 'vn' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        'accounting/cop-balance',
      ])),
    },
  }
}

export default Page
