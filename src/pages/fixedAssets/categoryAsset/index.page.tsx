import { BasicLayout } from '@/components/layouts/WrapLayout/BasicLayout'
import { Meta } from '@/components/meta'
import CategoryToolsAsset from '@/components/templates/Accounting/FixedAssets/CategoryToolsAsset/CategoryList'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <CategoryToolsAsset />

Page.getLayout = BasicLayout
Page.getMeta = Meta(() => ({ title: 'category asset list' }))

export const getServerSideProps = async ({ locale = 'vn' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        '',
      ])),
    },
  }
}

export default Page
