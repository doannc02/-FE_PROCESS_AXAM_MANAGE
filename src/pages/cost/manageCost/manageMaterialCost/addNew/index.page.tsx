import { BasicLayout } from '@/components/layouts/WrapLayout/BasicLayout'
import { Meta } from '@/components/meta'
import SaveMMC from '@/components/templates/Accounting/ManageCost/ManageMaterialCost/SaveMMC'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { TRANSLATE } from '@/routes'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <SaveMMC />

Page.getLayout = BasicLayout
Page.getMeta = Meta(() => ({ title: 'Manage Material Detail' }))

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
