import {
  Palette,
  ThemeOptions,
  createTheme,
} from "@mui/material";
import { LightPalette } from '../assets/scss/lightPalette';
import componentStyleOverrides from "./styleOverride";
import themeTypography from "./typography";

/**
 * Represent theme style and structure as per Material-UI
 * @param {JsonObject} customization customization parameter object
 */

const themeOption = {
  heading: "#000",
};



export const theme = () => {
  const paletteMode = LightPalette;
  const themeOptions: ThemeOptions  = {
    // breakpoints: {
    //   values: {
    //     xs: 0,
    //     sm: 600,
    //     md: 900,
    //     lg: 1200,
    //     xl: 1536,
    //   },
    // },
    direction: 'ltr',
    palette:  (paletteMode as unknown) as Palette,
    typography: themeTypography(themeOption)
  };

  const themes = createTheme(themeOptions);
  themes.components = componentStyleOverrides(themeOptions);

  return themes;
};

export default theme;
