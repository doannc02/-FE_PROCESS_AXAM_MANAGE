import { NoneLayout } from '@/components/layouts/WrapLayout/NoneLayout'
import { Meta } from '@/components/meta'
import Login from '@/components/templates/Login'
import { HttpResponse } from '@/lib/api'
import { combineGssp } from '@/lib/next/gssp/combineGssp'
import { checkLogin } from '@/lib/next/gssp/middleware/checkLogin'
import { NextPageWithLayout } from '@/lib/next/types'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <Login />

Page.getLayout = NoneLayout
Page.getMeta = Meta(() => ({
  title: 'Login',
  headNode: (
    <Head>
      <title>Đăng nhập hệ thống quản lý đề thi VIU</title>
      <meta
        name='description'
        content='Đăng nhập vào hệ thống quản lý đề thi VIU, nơi giúp bạn tạo và duyệt các đề thi một cách dễ dàng.'
      />
    </Head>
  ),
}))

export const getServerSideProps = combineGssp<any>(
  checkLogin(),
  async ({ locale = 'vn' }) => ({
    props: {
      ...(await serverSideTranslations(locale, ['common', 'login'])),
    },
  })
)

export default Page
