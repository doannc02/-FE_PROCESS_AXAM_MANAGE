import { BasicLayout } from '@/components/layouts/WrapLayout/BasicLayout'
import { Meta } from '@/components/meta'
import SaveAccountJournal from '@/components/templates/Accounting/V1/AccountJournal/SaveAccountJournal'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <SaveAccountJournal />

Page.getLayout = BasicLayout
Page.getMeta = Meta(() => ({ title: 'Update Accounting Book' }))

export const getServerSideProps = async ({ locale = 'vn' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        'accounting/account-journal',
      ])),
    },
  }
}

export default Page
