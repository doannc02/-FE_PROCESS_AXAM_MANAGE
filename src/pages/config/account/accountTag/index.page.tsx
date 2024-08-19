import { BasicLayout } from '@/components/layouts/WrapLayout/BasicLayout'
import { Meta } from '@/components/meta'
import AccountTagList from '@/components/templates/Accounting/V1/AccountTag/AccountTagList'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <AccountTagList />

Page.getLayout = BasicLayout
Page.getMeta = Meta(() => ({ title: 'Account Tag List' }))

export const getServerSideProps = async ({ locale = 'vn' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        'accounting/account-tag',
      ])),
    },
  }
}

export default Page
