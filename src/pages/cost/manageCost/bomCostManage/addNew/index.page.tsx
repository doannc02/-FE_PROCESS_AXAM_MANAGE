import { BasicLayout } from '@/components/layouts/WrapLayout/BasicLayout'
import { Meta } from '@/components/meta'
import BCMList from '@/components/templates/Accounting/ManageCost/BomCostManage/BCMList'
import SaveBCM from '@/components/templates/Accounting/ManageCost/BomCostManage/SaveBCM'
import SaveLCM from '@/components/templates/Accounting/ManageCost/LaborCostManage/SaveLCM'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { TRANSLATE } from '@/routes'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <SaveBCM />

Page.getLayout = BasicLayout
Page.getMeta = Meta(() => ({ title: 'Bom cost manage general detail' }))

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
