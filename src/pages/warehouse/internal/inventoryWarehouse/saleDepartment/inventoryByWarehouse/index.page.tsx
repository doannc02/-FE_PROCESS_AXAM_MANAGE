import { BasicLayout } from '@/components/layouts/WrapLayout/BasicLayout'
import { Meta } from '@/components/meta'
import { ViewInventoryByWarehouse } from '@/components/templates/Accounting/Warehouse/InventoryWarehouse/ViewInventoryByWarehouse'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <ViewInventoryByWarehouse />

Page.getLayout = BasicLayout
Page.getMeta = Meta(() => ({
  title: 'Xem tồn kho theo kho - Phòng bán hàng xem',
}))

export const getServerSideProps = async (context: any) => {
  const { locale = 'vn' } = context

  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        'warehouse/management/warehouseManagement/index',
      ])),
    },
  }
}

export default Page
