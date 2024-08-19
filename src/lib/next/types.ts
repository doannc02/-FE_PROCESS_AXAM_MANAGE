import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import type { ReactElement } from 'react'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout: (page: ReactElement) => ReactElement
  getMeta: (page: ReactElement, pageProps: P) => ReactElement
}

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}
