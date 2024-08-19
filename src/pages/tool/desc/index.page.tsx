import { BasicLayout } from '@/components/layouts/WrapLayout/BasicLayout'
import { Meta } from '@/components/meta'
import ToolsList from '@/components/templates/Accounting/FixedAssets/Desc/Tools/ToolsList'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <ToolsList />

Page.getLayout = BasicLayout
Page.getMeta = Meta(() => ({ title: 'Tool Decrease List' }))

export const getServerSideProps = async ({ locale = 'vn' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        'accounting/decrease-list',
      ])),
    },
  }
}

export default Page
