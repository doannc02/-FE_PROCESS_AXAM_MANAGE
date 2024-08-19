import { BasicLayout } from '@/components/layouts/WrapLayout/BasicLayout'
import { Meta } from '@/components/meta'
import SaveCategoryToolsAsset from '@/components/templates/Accounting/FixedAssets/CategoryToolsAsset/SaveCategoryToolsAsset'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <SaveCategoryToolsAsset />

Page.getLayout = BasicLayout
Page.getMeta = Meta(() => ({ title: 'Detail category asset' }))

export const getServerSideProps = async ({ locale = 'vn' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', ''])),
    },
  }
}

export default Page
