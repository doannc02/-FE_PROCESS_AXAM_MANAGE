import { BasicLayout } from '@/components/layouts/WrapLayout/BasicLayout'
import { Meta } from '@/components/meta'
import { FactoryWarehouseList } from '@/components/templates/Accounting/Warehouse/ExportWarehouse/FactoryWarehouse'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { TRANSLATE } from '@/routes'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <FactoryWarehouseList />

Page.getLayout = BasicLayout
Page.getMeta = Meta(() => ({ title: 'Product WareHouse' }))

export const getServerSideProps = async ({ locale = 'vn' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, [TRANSLATE.COMMON, TRANSLATE.WARE_HOUSE])),
    },
  }
}

export default Page
