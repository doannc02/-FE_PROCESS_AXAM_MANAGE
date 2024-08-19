import { NoneLayout } from '@/components/layouts/WrapLayout/NoneLayout'
import { Meta } from '@/components/meta'
import Maintain from '@/components/templates/Maintain'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'

type Props = HttpResponse<any>

const Page: NextPageWithLayout<Props> = () => <Maintain />

Page.getLayout = NoneLayout
Page.getMeta = Meta(() => ({ title: 'Maintain' }))

export default Page
