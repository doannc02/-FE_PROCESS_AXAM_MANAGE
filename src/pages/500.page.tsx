import { NoneLayout } from '@/components/layouts/WrapLayout/NoneLayout'
import { Meta } from '@/components/meta'
import Page500 from '@/components/templates/500'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'

type Props = HttpResponse<any>

const Page: NextPageWithLayout<Props> = () => <Page500 />

Page.getLayout = NoneLayout
Page.getMeta = Meta(() => ({ title: '500' }))

export default Page
