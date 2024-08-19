import { NoneLayout } from '@/components/layouts/WrapLayout/NoneLayout'
import { Meta } from '@/components/meta'
import Page404 from '@/components/templates/404'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'

type Props = HttpResponse<any>

const Page: NextPageWithLayout<Props> = () => <Page404 />

Page.getLayout = NoneLayout
Page.getMeta = Meta(() => ({ title: '404 Not Found' }))

export default Page
