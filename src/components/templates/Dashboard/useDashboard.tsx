import defaultValue from '@/redux/defaultValue'
import { useAppDispatch } from '@/redux/hook'
import { setButtonConfig } from '@/redux/reducer/buttonReducer'
import { setCompanyConfig } from '@/redux/reducer/companyConfigReducer'
import { setFontConfig } from '@/redux/reducer/fontReducer'
import { setThemeColor } from '@/redux/reducer/themeColorReducer'
import { useQueryGetCompanyUserLogin } from '@/service/common/company/userLogin'
import { useQueryGetThemeConfigAPI } from '@/service/common/theme/get'

export const useDashboard = () => {
  const dispatch = useAppDispatch()

  const {
    buttonDefaultConfig,
    themeColorDefaultConfig,
    fontDefaultConfig,
    companyConfig,
  } = defaultValue

  const { data: companyConfigApi } = useQueryGetCompanyUserLogin()

  if (companyConfigApi) {
    dispatch(
      setCompanyConfig({
        ...companyConfig,
        ...companyConfigApi.data,
      })
    )
  }

  const { data } = useQueryGetThemeConfigAPI()

  if (data) {
    const { buttonConfig, fontConfig, colorThemeConfig } = data.data

    if (buttonConfig.length > 0) {
      const buttonConfigValue = {
        submitButton:
          buttonConfig.find((i) => i.type === 'SUBMIT') ??
          buttonDefaultConfig.submitButton,
        draftButton:
          buttonConfig.find((i) => i.type === 'DRAFT') ??
          buttonDefaultConfig.draftButton,
        rejectButton:
          buttonConfig.find((i) => i.type === 'REJECT') ??
          buttonDefaultConfig.rejectButton,
        resetButton:
          buttonConfig.find((i) => i.type === 'RESET') ??
          buttonDefaultConfig.resetButton,
      }

      dispatch(setButtonConfig(buttonConfigValue))
    }

    if (fontConfig.length > 0) {
      const h1 = fontConfig.find((i) => i.type === 'H1')
      const h2 = fontConfig.find((i) => i.type === 'H2')
      const h3 = fontConfig.find((i) => i.type === 'H3')
      const h4 = fontConfig.find((i) => i.type === 'H4')
      const h5 = fontConfig.find((i) => i.type === 'H5')
      const h6 = fontConfig.find((i) => i.type === 'H6')
      const subtitle1 = fontConfig.find((i) => i.type === 'SUBTITLE1')
      const subtitle2 = fontConfig.find((i) => i.type === 'SUBTITLE2')
      const body1 = fontConfig.find((i) => i.type === 'BODY1')
      const body2 = fontConfig.find((i) => i.type === 'BODY2')
      const caption = fontConfig.find((i) => i.type === 'CAPTION')

      const fontConfigValue = {
        typeFont: fontDefaultConfig.typeFont,

        h1Color: h1 ? h1.color : fontDefaultConfig.h1Color,
        h1Font: h1 ? h1.font : fontDefaultConfig.h1Font,
        h1Size: h1 ? h1.size : fontDefaultConfig.h1Size,

        h2Color: h2 ? h2.color : fontDefaultConfig.h2Color,
        h2Font: h2 ? h2.font : fontDefaultConfig.h2Font,
        h2Size: h2 ? h2.size : fontDefaultConfig.h2Size,

        h3Color: h3 ? h3.color : fontDefaultConfig.h3Color,
        h3Font: h3 ? h3.font : fontDefaultConfig.h3Font,
        h3Size: h3 ? h3.size : fontDefaultConfig.h3Size,

        h4Color: h4 ? h4.color : fontDefaultConfig.h4Color,
        h4Font: h4 ? h4.font : fontDefaultConfig.h4Font,
        h4Size: h4 ? h4.size : fontDefaultConfig.h4Size,

        h5Color: h5 ? h5.color : fontDefaultConfig.h5Color,
        h5Font: h5 ? h5.font : fontDefaultConfig.h5Font,
        h5Size: h5 ? h5.size : fontDefaultConfig.h5Size,

        h6Color: h6 ? h6.color : fontDefaultConfig.h6Color,
        h6Font: h6 ? h6.font : fontDefaultConfig.h6Font,
        h6Size: h6 ? h6.size : fontDefaultConfig.h6Size,

        subtitle1Color: subtitle1
          ? subtitle1.color
          : fontDefaultConfig.subtitle1Color,
        subtitle1Font: subtitle1
          ? subtitle1.font
          : fontDefaultConfig.subtitle1Font,
        subtitle1Size: subtitle1
          ? subtitle1.size
          : fontDefaultConfig.subtitle1Size,

        subtitle2Color: subtitle2
          ? subtitle2.color
          : fontDefaultConfig.subtitle2Color,
        subtitle2Font: subtitle2
          ? subtitle2.font
          : fontDefaultConfig.subtitle2Font,
        subtitle2Size: subtitle2
          ? subtitle2.size
          : fontDefaultConfig.subtitle2Size,

        body1Color: body1 ? body1.color : fontDefaultConfig.body1Color,
        body1Font: body1 ? body1.font : fontDefaultConfig.body1Font,
        body1Size: body1 ? body1.size : fontDefaultConfig.body1Size,

        body2Color: body2 ? body2.color : fontDefaultConfig.body2Color,
        body2Font: body2 ? body2.font : fontDefaultConfig.body2Font,
        body2Size: body2 ? body2.size : fontDefaultConfig.body2Size,

        captionColor: caption ? caption.color : fontDefaultConfig.captionColor,
        captionFont: caption ? caption.font : fontDefaultConfig.captionFont,
        captionSize: caption ? caption.size : fontDefaultConfig.captionSize,
      }

      dispatch(setFontConfig(fontConfigValue))
    }

    if (colorThemeConfig) {
      const { layouts, theme } = colorThemeConfig

      if (theme && layouts) {
        const colorThemeConfigValue = {
          layout: 'layout1',
          theme: theme.theme ? theme.theme : 'CUSTOM',
          firstMainColor: theme.firstMainColor
            ? theme.firstMainColor
            : themeColorDefaultConfig.firstMainColor,
          secondMainColor: theme.secondMainColor
            ? theme.secondMainColor
            : themeColorDefaultConfig.secondMainColor,
          thirdMainColor: theme.thirdMainColor
            ? theme.thirdMainColor
            : themeColorDefaultConfig.thirdMainColor,
          fourthMainColor: theme.fourthMainColor
            ? theme.fourthMainColor
            : themeColorDefaultConfig.fourthMainColor,
          successColor: theme.successColor
            ? theme.successColor
            : themeColorDefaultConfig.successColor,
          errorColor: theme.errorColor
            ? theme.errorColor
            : themeColorDefaultConfig.errorColor,
          warningColor: theme.warningColor
            ? theme.warningColor
            : themeColorDefaultConfig.warningColor,
        }

        dispatch(setThemeColor(colorThemeConfigValue))
      }
    }
  }

  return [{}, {}] as const
}
