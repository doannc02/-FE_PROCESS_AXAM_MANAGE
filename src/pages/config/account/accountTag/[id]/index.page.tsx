import { BasicLayout } from '@/components/layouts/WrapLayout/BasicLayout'
import { Meta } from '@/components/meta'
import SaveAccountTag from '@/components/templates/Accounting/V1/AccountTag/SaveAccountTag'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <SaveAccountTag />

Page.getLayout = BasicLayout
Page.getMeta = Meta(() => ({ title: 'Update Account Tag' }))

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
