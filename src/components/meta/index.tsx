import { HttpResponse } from '@/lib/api'
import Head from 'next/head'
import { ReactElement } from 'react'

const defaultMeta = {
  title: 'Title Default',
  headNode: null,
}

export function Meta<T extends HttpResponse<unknown>>(
  getMeta?: (pageProps: T) => {
    title?: string
    headNode?: ReactElement
  }
) {
  return function MetaNode(page: ReactElement, pageProps: T) {
    const { title, headNode } = { ...defaultMeta, ...getMeta?.(pageProps) }
    return (
      <>
        <Head>
          <title>{title}</title>
          {headNode}
        </Head>
        {page}
      </>
    )
  }
}
