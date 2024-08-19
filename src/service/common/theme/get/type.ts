export type FontConfig = {
  id?: number | null
  color: string
  font: string
  size: number
  type: string
}

export type ThemeColorConfig = {
  id?: number | null
  layout?: string | null
  theme?: string | null
  firstMainColor: string
  secondMainColor: string
  thirdMainColor: string
  fourthMainColor: string
  successColor: string
  errorColor: string
  warningColor: string
}

export type ButtonConfig = {
  id?: number | null
  type: string
  textColor: string
  hoverTextColor: string
  backgroundColor: string
  backgroundHoverColor: string
  borderColor: string
  borderHoverColor: string
}

export type Response = {
  GET: {
    message: string
    traceId: string
    data: {
      colorThemeConfig: {
        layouts: {
          id: number
          name: string
          isSelected: boolean
        }[]

        theme: ThemeColorConfig
      }
      fontConfig: FontConfig[]
      buttonConfig: ButtonConfig[]
    }
  }
}
