import { BasicLayout } from '@/components/layouts/WrapLayout/BasicLayout'
import { Meta } from '@/components/meta'
import SaveDescAsset from '@/components/templates/Accounting/FixedAssets/Desc/Assets/SaveDescAsset'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <SaveDescAsset />

Page.getLayout = BasicLayout
Page.getMeta = Meta(() => ({ title: 'Add new decrease asset' }))

export const getServerSideProps = async ({ locale = 'vn' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        'accounting/entry-list',
      ])),
    },
  }
}

export default Page
