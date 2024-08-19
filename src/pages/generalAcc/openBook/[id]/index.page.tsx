import { BasicLayout } from '@/components/layouts/WrapLayout/BasicLayout'
import { Meta } from '@/components/meta'
import OpenOrLockUpBook from '@/components/templates/Accounting/GeneralAccounting/OpenOrLockUp'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { TRANSLATE } from '@/routes'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <OpenOrLockUpBook />

Page.getLayout = BasicLayout
Page.getMeta = Meta(() => ({ title: 'Update Book Key' }))

export const getServerSideProps = async ({ locale = 'vn' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        TRANSLATE.COMMON,
        // TRANSLATE.,
      ])),
    },
  }
}

export default Page
