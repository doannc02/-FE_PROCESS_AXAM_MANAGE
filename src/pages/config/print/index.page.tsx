import { BasicLayout } from '@/components/layouts/WrapLayout/BasicLayout'
import { Meta } from '@/components/meta'
import PrintConfig from '@/components/templates/Accounting/V1/PrintConfig'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <PrintConfig />

Page.getLayout = BasicLayout
Page.getMeta = Meta(() => ({ title: 'Print' }))

export const getServerSideProps = async ({ locale = 'vn' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        'accounting/account-print',
      ])),
    },
  }
}

export default Page
