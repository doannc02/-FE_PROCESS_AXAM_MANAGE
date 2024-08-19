
import { BasicLayout } from '@/components/layouts/WrapLayout/BasicLayout'
import { Meta } from '@/components/meta'
import AccountJournalList from '@/components/templates/Accounting/V1/AccountJournal/AccountJournalList'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <AccountJournalList />

Page.getLayout = BasicLayout
Page.getMeta = Meta(() => ({ title: 'Account Journal List' }))

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
