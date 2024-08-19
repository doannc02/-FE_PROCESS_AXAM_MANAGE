import { DialogProvider } from '@/components/hooks/dialog/useDialog'
import { useAppSelector } from '@/redux/hook'
import { createTheme } from '@mui/material'
import NextNProgress from 'nextjs-progressbar'
import { ReactElement } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { RecoilRoot } from 'recoil'
import ModeTheme from '../Theme'
import { getThemeConfig } from '../Theme/themeMUIConfig'

const queryClient = new QueryClient()

export const NoneLayout = (page: ReactElement) => {
  const mainTheme = useAppSelector((state) => state.themeColorData)
  const fontConfig = useAppSelector((state) => state.fontData)

  const themeConfig = getThemeConfig(mainTheme, fontConfig)

  const theme = createTheme(themeConfig)

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <ModeTheme theme={theme}>
          <>
            <NextNProgress
              color='red'
              height={4}
              options={{ showSpinner: false }}
            />
            <DialogProvider>{page}</DialogProvider>
          </>
        </ModeTheme>
      </RecoilRoot>
    </QueryClientProvider>
  )
}
