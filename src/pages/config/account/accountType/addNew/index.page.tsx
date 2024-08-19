import { BasicLayout } from '@/components/layouts/WrapLayout/BasicLayout'
import { Meta } from '@/components/meta'
import SaveAccountType from '@/components/templates/Accounting/V1/AccountType/SaveAccountType'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <SaveAccountType />

Page.getLayout = BasicLayout
Page.getMeta = Meta(() => ({ title: 'Create Account Type' }))

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
