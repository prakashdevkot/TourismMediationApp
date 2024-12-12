import { createTheme } from '@material-ui/core/styles';
import { amber, teal } from '@material-ui/core/colors';

const theme = createTheme({ 
  typography: {
    useNextVariants: true,
    fontFamily: 'Roboto, Arial, sans-serif', // Modern font family
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
      color: '#3e2723', // Dark brown for heading
    },
    body1: {
      fontSize: '1rem',
      color: '#37474f', // Subtle dark blue-gray for body text
    },
  },
  palette: {
    primary: {
      light: '#ffe57f', // Light amber
      main: '#ffc107', // Amber
      dark: '#ffa000', // Dark amber
      contrastText: '#000', // Black text
    },
    secondary: {
      light: '#a7ffeb', // Light teal
      main: '#64ffda', // Teal
      dark: '#1de9b6', // Dark teal
      contrastText: '#fff', // White text
    },
    openTitle: '#37474f', // Blue-gray for open titles
    protectedTitle: teal['600'], // Teal for protected titles
    type: 'light',
  },
});

export default theme;