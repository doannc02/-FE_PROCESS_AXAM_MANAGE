import { BasicLayout } from '@/components/layouts/WrapLayout/BasicLayout'
import { Meta } from '@/components/meta'
import { ViewInventoryByProductTemplate } from '@/components/templates/Accounting/Warehouse/InventoryWarehouse/ViewInventoryByProductTemplate'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <ViewInventoryByProductTemplate />

Page.getLayout = BasicLayout
Page.getMeta = Meta(() => ({
  title: 'Xem tồn kho theo chiều sản phẩm - Phòng bán hàng xem',
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
