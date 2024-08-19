import { BasicLayout } from '@/components/layouts/WrapLayout/BasicLayout'
import { Meta } from '@/components/meta'
import SaveBankBalance from '@/components/templates/Accounting/Balance/BankBalance/SaveBankBalance'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <SaveBankBalance />

Page.getLayout = BasicLayout
Page.getMeta = Meta(() => ({ title: 'Thêm mới số dư ngân hàng' }))

export const getServerSideProps = async ({ locale = 'vn' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        'accounting/bank-balance',
      ])),
    },
  }
}

export default Page
