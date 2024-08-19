import { BasicLayout } from '@/components/layouts/WrapLayout/BasicLayout'
import { Meta } from '@/components/meta'
import EscAssetList from '@/components/templates/Accounting/FixedAssets/Esc/EscAssetList'
import SaveEscTool from '@/components/templates/Accounting/FixedAssets/Esc/HandMade/SaveEscTool'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <SaveEscTool />

Page.getLayout = BasicLayout
Page.getMeta = Meta(() => ({ title: 'Chỉnh sửa' }))

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
