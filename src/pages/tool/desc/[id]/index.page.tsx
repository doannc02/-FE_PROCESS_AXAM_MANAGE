import { BasicLayout } from '@/components/layouts/WrapLayout/BasicLayout'
import { Meta } from '@/components/meta'
import EntryList from '@/components/templates/Accounting/Entry/EntryList'
import SaveDescTools from '@/components/templates/Accounting/FixedAssets/Desc/Tools/SaveDescTools'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <SaveDescTools />

Page.getLayout = BasicLayout
Page.getMeta = Meta(() => ({ title: 'Entry List' }))

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
