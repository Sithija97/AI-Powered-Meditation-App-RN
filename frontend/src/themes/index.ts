import {
  Palette,
  ThemeOptions,
  createTheme,
} from "@mui/material";
import { LightPalette } from '../assets/scss/lightPalette';

/**
 * Represent theme style and structure as per Material-UI
 * @param {JsonObject} customization customization parameter object
 */

export const theme = () => {
  const paletteMode = LightPalette;
  const themeOptions: ThemeOptions  = {
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1536,
      },
    },
    direction: 'ltr',
    palette:  (paletteMode as unknown) as Palette,
    typography: {
      h6: {
        fontWeight: 500,
        color: '#121926',
        fontSize: '0.75rem'
      },
      h5: {
        fontSize: '0.875rem',
        color: '#121926',
        fontWeight: 500
      },
      h4: {
        fontSize: '1rem',
        color: '#121926',
        fontWeight: 600
      },
      h3: {
        fontSize: '1.25rem',
        color: '#121926',
        fontWeight: 600
      },
      h2: {
        fontSize: '1.5rem',
        color: '#121926',
        fontWeight: 700
      },
      h1: {
        fontSize: '1.938rem',
        color: '#121926',
        fontWeight: 700
      },
    }
  };

  const themes = createTheme(themeOptions);

  return themes;
};

export default theme;
