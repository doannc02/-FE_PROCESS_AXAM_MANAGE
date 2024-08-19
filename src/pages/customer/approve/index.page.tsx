import { BasicLayout } from '@/components/layouts/WrapLayout/BasicLayout'
import { Meta } from '@/components/meta'
import DebtApproveList from '@/components/templates/Accounting/Customer/DebtApprove/DebtApproveList'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <DebtApproveList />

Page.getLayout = BasicLayout
Page.getMeta = Meta(() => ({ title: 'Phê duyệt chính sách cấp công nợ' }))

export const getServerSideProps = async ({ locale = 'vn' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        'accounting/debt-approve',
      ])),
    },
  }
}

export default Page
