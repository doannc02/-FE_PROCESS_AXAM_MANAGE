import { BasicLayout } from '@/components/layouts/WrapLayout/BasicLayout'
import { Meta } from '@/components/meta'
import SaveAccountingSystemConfig from '@/components/templates/Accounting/V1/AccountingSystemConfig/SaveAccountingSystemConfig'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <SaveAccountingSystemConfig />

Page.getLayout = BasicLayout
Page.getMeta = Meta(() => ({ title: 'Create' }))

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
