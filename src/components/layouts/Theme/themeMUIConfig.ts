import { GRAY_SCALE, RED, WHITE } from '@/helper/colors'
import { FontConfig, ThemeColorConfig } from '@/redux/type'
import { Components, PaletteOptions, Theme, ThemeOptions } from '@mui/material'

const getPalette = (mainTheme: ThemeColorConfig): PaletteOptions => ({
  primary: {
    main: mainTheme.firstMainColor,
    dark: mainTheme.firstMainColor,
  },
  secondary: {
    main: mainTheme.secondMainColor,
    dark: mainTheme.secondMainColor,
  },
  success: {
    main: mainTheme.thirdMainColor,
    dark: mainTheme.thirdMainColor,
  },
  error: {
    main: mainTheme.errorColor,
    light: mainTheme.errorColor,
    dark: mainTheme.errorColor,
  },
  warning: {
    main: mainTheme.warningColor,
    light: mainTheme.warningColor,
    dark: mainTheme.warningColor,
  },
})

const getTypography = (fontConfig: FontConfig): any => ({
  fontFamily: [
    'Open Sans',
    'Times New Roman',
    'Nunito',
    '-apple-system',
    'BlinkMacSystemFont',
    'sans-serif',
  ].join(','),
  allVariants: {
    fontSize: '1rem',
  },
  h1: {
    fontSize: `${fontConfig.h1Size}rem`,
    lineHeight: `${fontConfig.h1Size}rem`,
    // color: fontConfig.h1Color,
    fontFamily: fontConfig.h1Font,
    fontWeight: 'light',
    '@media (max-width:640px)': {
      fontSize: '4.5rem',
    },
  },
  h2: {
    fontSize: `${fontConfig.h2Size}rem`,
    lineHeight: `${fontConfig.h2Size}rem`,
    // color: fontConfig.h2Color,
    fontFamily: fontConfig.h2Font,
    fontWeight: 'light',
    '@media (max-width:640px)': {
      fontSize: '3.125rem',
    },
  },
  h3: {
    fontSize: `${fontConfig.h3Size}rem`,
    lineHeight: `${fontConfig.h3Size}rem`,
    // color: fontConfig.h3Color,
    fontFamily: fontConfig.h3Font,
    fontWeight: 700,
    '@media (max-width:640px)': {
      fontSize: '1.75rem',
    },
  },
  h4: {
    fontSize: `${fontConfig.h4Size}rem`,
    lineHeight: `${fontConfig.h4Size}rem`,
    // color: fontConfig.h4Color,
    fontFamily: fontConfig.h4Font,
    fontWeight: 700,
    '@media (max-width:640px)': {
      fontSize: '1.5rem',
    },
  },
  h5: {
    fontSize: `${fontConfig.h5Size}rem`,
    lineHeight: `${fontConfig.h5Size}rem`,
    // color: fontConfig.h5Color,
    fontFamily: fontConfig.h5Font,
    fontWeight: 600,
    '@media (max-width:640px)': {
      fontSize: '1.375rem',
    },
  },
  h6: {
    fontSize: `${fontConfig.h6Size}rem`,
    lineHeight: `${fontConfig.h6Size}rem`,
    // color: fontConfig.h6Color,
    fontFamily: fontConfig.h6Font,
    fontWeight: 600,
    '@media (max-width:640px)': {
      fontSize: '1.0625rem',
    },
  },
  subtitle1: {
    fontSize: `${fontConfig.subtitle1Size}rem`,
    lineHeight: `${fontConfig.subtitle1Size}rem`,
    // color: fontConfig.subtitle1Color,
    fontFamily: fontConfig.subtitle1Font,
    fontWeight: 600,
    '@media (max-width:640px)': {
      fontSize: '0.875rem',
    },
  },
  subtitle2: {
    fontSize: `${fontConfig.subtitle2Size}rem`,
    lineHeight: `${fontConfig.subtitle2Size}rem`,
    // color: fontConfig.subtitle2Color,
    fontFamily: fontConfig.subtitle2Font,
    fontWeight: 500,
    '@media (max-width:640px)': {
      fontSize: '0.75rem',
    },
  },
  body1: {
    fontSize: `${fontConfig.body1Size}rem`,
    lineHeight: `${fontConfig.body1Size}rem`,
    // color: fontConfig.body1Color,
    fontFamily: fontConfig.body1Font,
    fontWeight: 'normal',
    '@media (max-width:640px)': {
      fontSize: '0.875rem',
    },
  },
  body2: {
    fontSize: `${fontConfig.body2Size}rem`,
    lineHeight: `${fontConfig.body2Size}rem`,
    // color: fontConfig.body2Color,
    fontFamily: fontConfig.body2Font,
    '@media (max-width:640px)': {
      fontSize: '0.75rem',
    },
  },
  caption: {
    fontSize: `${fontConfig.captionSize}rem`,
    lineHeight: `${fontConfig.captionSize}rem`,
    // color: fontConfig.captionColor,
    fontFamily: fontConfig.captionFont,
    '@media (max-width:640px)': {
      fontSize: '0.75rem',
    },
  },
})

const getComponentMUIConfig = (
  typography: any
): Components<Omit<Theme, 'components'>> => {
  return {
    MuiButton: {
      styleOverrides: {
        root: {
          margin: 'none',
          borderRadius: 6,
          ':hover': {
            opacity: 0.8,
          },
          minHeight: 32,
          ':disabled': {
            opacity: 0.7,
          },
        },
      },
      defaultProps: {
        disableElevation: true,
        variant: 'contained' as any,
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          padding: 4,
        },
      },
    },

    MuiInputBase: {
      styleOverrides: {
        input: {
          padding: '4px 4px 4px 0px',
        },
      },
    },

    MuiInputLabel: {
      styleOverrides: {
        asterisk: {
          color: RED,
        },
      },
      defaultProps: {
        shrink: true,
        sx: {
          ...typography.body2,
          // padding: '2px',
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          // minHeight: 32,
          borderColor: GRAY_SCALE,
        },
        input: {
          // padding: '10px 15px',
        },
        notchedOutline: { borderColor: GRAY_SCALE },
      },
      defaultProps: {
        // notched: true,
        sx: {
          ...typography.body2,
          borderRadius: '4px',
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          // paddingBottom: 7,
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        InputProps: {
          style: {
            // minHeight: 48,
          },
        },
      },
      styleOverrides: {
        root: {
          ...typography.body2,
        },
      },
    },

    MuiAutocomplete: {
      styleOverrides: {
        tag: {
          ...typography.body2,
          // margin: '1px 3px',
          //padding: 0,
        },
        hasPopupIcon: { padding: 0 },
        hasClearIcon: { padding: 0 },
        inputRoot: {
          paddingBottom: 0,
        },
      },
    },

    MuiBreadcrumbs: {
      styleOverrides: {
        separator: {
          marginLeft: '3px',
          marginRight: '3px',
        },
      },
    },
    MuiPopover: {},
    MuiPopper: {},
    MuiCardHeader: {
      styleOverrides: {
        action: {
          display: 'flex',
          flex: 1,
          justifyContent: 'flex-end',
          margin: 0,
        },
        content: {
          width: 'fit-content',
          flex: 'inherit',
        },
      },
    },

    MuiDialog: {
      styleOverrides: {
        container: {
          minWidth: 500,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          fontSize: typography.body1.fontSize,
          lineHeight: 1.2,
          padding: '0.6rem',
        },
      },
    },

    MuiFormHelperText: {
      styleOverrides: {
        root: {
          margin: '5px 0px',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {},
      },
    },

    MuiGrid: {
      styleOverrides: {
        root: {
          margin: 0,
          width: '100%',
        },
      },
    },

    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: WHITE,
          boxShadow: '0px 0px 4px 0px rgba(114, 114, 114, 0.25)',
          borderRadius: '4px',
        },
      },
    },
  }
}

export const getThemeConfig = (
  mainTheme: ThemeColorConfig,
  fontConfig: FontConfig
): ThemeOptions => {
  const typography = getTypography(fontConfig)
  return {
    palette: getPalette(mainTheme),
    typography,
    components: getComponentMUIConfig(typography),
  }
}
