import { BasicLayout } from '@/components/layouts/WrapLayout/BasicLayout'
import { Meta } from '@/components/meta'
import DebtReceivableDetail from '@/components/templates/Accounting/Debt/DebtReceivable/DebtReceivableDetail'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <DebtReceivableDetail />

Page.getLayout = BasicLayout
Page.getMeta = Meta(() => ({ title: 'Chi tiết công nợ' }))

export const getServerSideProps = async ({ locale = 'vn' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        'accounting/debt-payable',
      ])),
    },
  }
}

export default Page
