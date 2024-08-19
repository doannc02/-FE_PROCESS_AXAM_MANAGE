import { Theme, ThemeProvider } from '@mui/material/styles'
import { ReactNode, memo, useEffect } from 'react'

const ModeTheme = ({
  theme,
  children,
}: {
  theme: Theme
  children: ReactNode
}) => {
  const { mode } = theme.palette

  useEffect(() => {
    document.body.classList.add(mode === 'light' ? 'light' : 'dark')
    document.body.classList.remove(mode === 'light' ? 'dark' : 'light')
  }, [mode])

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

export default memo(ModeTheme)
