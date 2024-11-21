import { DialogProvider } from '@/components/hooks/dialog/useDialog'
import { useAppSelector } from '@/redux/hook'
import { createTheme } from '@mui/material'
import NextNProgress from 'nextjs-progressbar'
import { ReactElement, useEffect, useMemo } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { RecoilRoot, useRecoilValue } from 'recoil'
import { useRouter } from 'next/router'
import ModeTheme from '../Theme'
import { getThemeConfig } from '../Theme/themeMUIConfig'
import multipleLayout from '../MultipleLayouts'
import { layoutType } from '../MultipleLayouts/layoutTypeRecoil'
import Notifications from '../MultipleLayouts/Layout1/components/Header/Notifications'

const queryClient = new QueryClient()

export const BasicLayout = (page: ReactElement) => {
  const mainTheme = useAppSelector((state) => state.themeColorData)
  const fontConfig = useAppSelector((state) => state.fontData)

  const themeConfig = getThemeConfig(mainTheme, fontConfig)

  const theme = createTheme(themeConfig)

  queryClient.invalidateQueries('api/v1/notification/get-by-user-id')

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <ModeTheme theme={theme}>
          <Layout layouts={multipleLayout}>
            <NextNProgress
              color='red'
              height={4}
              options={{ showSpinner: false }}
            />
            <DialogProvider>{page}</DialogProvider>
          </Layout>
        </ModeTheme>
      </RecoilRoot>
    </QueryClientProvider>
  )
}

const Layout = (props: any) => {
  const { layouts, children } = props
  const layoutRecoilValue = useRecoilValue(layoutType)

  const LayoutSwitch = useMemo(
    () => layouts[layoutRecoilValue],
    [layoutRecoilValue, layouts]
  )

  return <LayoutSwitch>{children}</LayoutSwitch>
}
