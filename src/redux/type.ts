export type FontConfig = {
  typeFont: string

  h1Color: string
  h1Font: string
  h1Size: number

  h2Color: string
  h2Font: string
  h2Size: number

  h3Color: string
  h3Font: string
  h3Size: number

  h4Color: string
  h4Font: string
  h4Size: number

  h5Color: string
  h5Font: string
  h5Size: number

  h6Color: string
  h6Font: string
  h6Size: number

  subtitle1Color: string
  subtitle1Font: string
  subtitle1Size: number

  subtitle2Color: string
  subtitle2Font: string
  subtitle2Size: number

  body1Color: string
  body1Font: string
  body1Size: number

  body2Color: string
  body2Font: string
  body2Size: number

  captionColor: string
  captionFont: string
  captionSize: number
}

export type userConfig = {
  userId: number
}

export type ThemeColorConfig = {
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

type ItemButtonConfig = {
  textColor: string
  hoverTextColor: string
  backgroundColor: string
  backgroundHoverColor: string
  borderColor: string
  borderHoverColor: string
}

export type ButtonConfig = {
  submitButton: ItemButtonConfig
  draftButton: ItemButtonConfig
  rejectButton: ItemButtonConfig
  resetButton: ItemButtonConfig
}

export type TableConfig = {
  tableName: string
  columns: string[]
}[]

export type CurrentLogin = {
  name: string | ""
  fullname: string | ""
  email: string | null
  avatar?: string
}
