import { PaletteColor, PaletteColorOptions } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    account: PaletteColor;
    opportunity: PaletteColor;
    estimation: PaletteColor;
    background2: PaletteColor;
    background3: PaletteColor;
  }

  interface PaletteOptions {
    account?: PaletteColorOptions;
    opportunity?: PaletteColorOptions;
    estimation?: PaletteColorOptions;
    background2?: PaletteColorOptions;
    background3?: PaletteColorOptions;
  }
}
