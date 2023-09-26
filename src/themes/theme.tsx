import { createTheme } from '@mui/material'

declare module '@mui/material/styles' {
  interface Palette {
    darkNeutrals: Palette['grey']
    neutral: Palette['grey']
    lightBlue: Palette['grey']
    focus: Palette['primary']
    progress: Palette['primary']
  }
  interface PaletteOptions {
    darkNeutrals: PaletteOptions['grey']
    neutral: PaletteOptions['grey']
    lightBlue: PaletteOptions['grey']
    focus: PaletteOptions['primary']
    progress: PaletteOptions['primary']
  }
}

export const theme = createTheme({
  typography: {
    fontFamily: ['Karla', 'sans-serif'].join(','),
  },
  palette: {
    primary: {
      main: '#005DAA', //blue/5
      light: '#1F75BB', //blue/4
      dark: '#003c77', //blue/6
    },
    lightBlue: {
      '100': '#F3FAFF', //blue/1
      '200': '#E0F1FE', //blue/2
      '300': '#C4E3FE', //blue/3
      '400': '#1976D2', //Light/Primary/Main
      '500': '#C5E4FF', //blue/4
    },
    neutral: {
      '100': '#FAFBFC',
      '200': '#F4F6F9',
      '300': '#E7ECF0',
      '400': '#DCE3E8',
      '500': '#BCC5CC',
    },
    darkNeutrals: {
      '100': '#9FB1BD',
      '200': '#5B7282',
      '300': '#3E5463',
      '400': '#2A3F4D',
      '500': '#1C2B36',
      '600': '#0E171F',
    },
    focus: {
      main: '#1F75BB',
    },
    progress: {
      dark: '#97B5FF',
      main: '#D9E4FF',
      light: '#EDF4FF',
    },
    warning: {
      dark: '#FFC107',
      main: '#FFE186',
      light: '#FFF8E1',
    },
    success: {
      dark: '#11834A',
      main: '#6EDCA5',
      light: '#EFFBF5',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
})
