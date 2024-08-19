import { BasicLayout } from '@/components/layouts/WrapLayout/BasicLayout'
import { Meta } from '@/components/meta'
import SaveInventoryFirstPeriod from '@/components/templates/Accounting/Warehouse/InventoryWarehouse/InventoryFirstPeriod/Save'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { TRANSLATE } from '@/routes'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <SaveInventoryFirstPeriod />

Page.getLayout = BasicLayout
Page.getMeta = Meta(() => ({
  title: 'Thêm mới tồn kho đầu kỳ',
}))

export const getServerSideProps = async (context: any) => {
  const { locale = 'vn' } = context

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
