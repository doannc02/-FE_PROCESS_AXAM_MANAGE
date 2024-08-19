import { BasicLayout } from '@/components/layouts/WrapLayout/BasicLayout'
import { Meta } from '@/components/meta'
import SaveEscHandMadeAsset from '@/components/templates/Accounting/FixedAssets/Esc/HandMade/SaveEscAssets'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <SaveEscHandMadeAsset />

Page.getLayout = BasicLayout
Page.getMeta = Meta(() => ({ title: 'Add New Record ESC' }))

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
