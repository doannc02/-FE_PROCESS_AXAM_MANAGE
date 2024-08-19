import { NoneLayout } from '@/components/layouts/WrapLayout/NoneLayout'
import { Meta } from '@/components/meta'
import Page403 from '@/components/templates/403'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'

type Props = HttpResponse<any>

const Page: NextPageWithLayout<Props> = () => <Page403 />

Page.getLayout = NoneLayout
Page.getMeta = Meta(() => ({ title: '403' }))

export default Page
