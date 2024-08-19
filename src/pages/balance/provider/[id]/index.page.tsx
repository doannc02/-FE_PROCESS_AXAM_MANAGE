import { BasicLayout } from '@/components/layouts/WrapLayout/BasicLayout'
import { Meta } from '@/components/meta'
import SaveCOPDebtBalance from '@/components/templates/Accounting/Balance/COPBalance/SaveCOPBalanceList'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <SaveCOPDebtBalance />

Page.getLayout = BasicLayout
Page.getMeta = Meta(() => ({ title: 'Chỉnh sửa số dư' }))

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
