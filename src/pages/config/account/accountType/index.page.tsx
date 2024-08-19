import { BasicLayout } from '@/components/layouts/WrapLayout/BasicLayout'
import { Meta } from '@/components/meta'
import AccountTypeList from '@/components/templates/Accounting/V1/AccountType/AccountTypeList'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <AccountTypeList />

Page.getLayout = BasicLayout
Page.getMeta = Meta(() => ({ title: 'Account Type List' }))

export const getServerSideProps = async ({ locale = 'vn' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        'accounting/account-type',
      ])),
    },
  }
}

export default Page
