import { BasicLayout } from '@/components/layouts/WrapLayout/BasicLayout'
import { Meta } from '@/components/meta'
import BankReport from '@/components/templates/Accounting/BankReport'
import { StockPickingRequestList } from '@/components/templates/Accounting/Warehouse/ImportWarehouse/StockPickingRequestList'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { TRANSLATE } from '@/routes'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <StockPickingRequestList />

Page.getLayout = BasicLayout
Page.getMeta = Meta(() => ({ title: 'Product WareHouse' }))

export const getServerSideProps = async ({ locale = 'vn' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        TRANSLATE.COMMON,
        TRANSLATE.WARE_HOUSE,
      ])),
    },
  }
}

export default Page
