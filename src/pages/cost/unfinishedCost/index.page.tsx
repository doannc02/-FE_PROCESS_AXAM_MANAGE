import { BasicLayout } from '@/components/layouts/WrapLayout/BasicLayout'
import { Meta } from '@/components/meta'
import THCPList from '@/components/templates/Accounting/THCP/THCPList'
import UnfinishedCostList from '@/components/templates/Accounting/UnfinishedCost/UnfinishedCostList'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { TRANSLATE } from '@/routes'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <UnfinishedCostList />

Page.getLayout = BasicLayout
Page.getMeta = Meta(() => ({ title: 'Unfinished Cost List' }))

export const getServerSideProps = async ({ locale = 'vn' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        TRANSLATE.COMMON,
        TRANSLATE.THCP,
      ])),
    },
  }
}

export default Page
