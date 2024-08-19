import { BasicLayout } from '@/components/layouts/WrapLayout/BasicLayout'
import { Meta } from '@/components/meta'
import DebtReceivableList from '@/components/templates/Accounting/Debt/DebtReceivable/DebtReceivableList'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <DebtReceivableList />

Page.getLayout = BasicLayout
Page.getMeta = Meta(() => ({ title: 'Công nợ phải thu' }))

export const getServerSideProps = async ({ locale = 'vn' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        'accounting/debt-receivable',
      ])),
    },
  }
}

export default Page
