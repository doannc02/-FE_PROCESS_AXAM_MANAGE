import { BasicLayout } from '@/components/layouts/WrapLayout/BasicLayout'
import { Meta } from '@/components/meta'
import TaxReturnConfigList from '@/components/templates/Accounting/TaxReturnConfig/TaxReturnConfigList'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { TRANSLATE } from '@/routes'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <TaxReturnConfigList />

Page.getLayout = BasicLayout
Page.getMeta = Meta(() => ({ title: 'Tax Return Config' }))

export const getServerSideProps = async ({ locale = 'vn' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        TRANSLATE.COMMON,
        TRANSLATE.TAX_RETURN,
      ])),
    },
  }
}

export default Page
