import { BasicLayout } from '@/components/layouts/WrapLayout/BasicLayout'
import { Meta } from '@/components/meta'
import AccountingSystemConfigList from '@/components/templates/Accounting/V1/AccountingSystemConfig/AccountingSystemConfigList'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <AccountingSystemConfigList />

Page.getLayout = BasicLayout
Page.getMeta = Meta(() => ({ title: 'Accounting System Config' }))

export const getServerSideProps = async ({ locale = 'vn' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        'accounting/accounting-system-config',
      ])),
    },
  }
}

export default Page
