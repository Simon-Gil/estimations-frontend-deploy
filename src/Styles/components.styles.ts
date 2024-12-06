import { Theme } from "@mui/material";

export const inputStyles = {
  placeHolrder: "black", // Color de texto de marcador
  color: "black !important", // Color de texto

};

export const inputNumberStyles = {
  backgroundColor: (theme: Theme) => theme.palette.background.default, // Fondo con color de tema
  borderRadius: 2, // Bordes redondeados
  border: "1px solid", // Borde de 1px
  borderColor: (theme: Theme) => theme.palette.secondary.main, // Color de borde
  "& .MuiFilledInput-root": {
    backgroundColor: "transparent", // Fondo con color de tema
    "&:focus": {
      boxShadow: "none", // Elimina el sombreado del foco
    },
  },
  "& input[type='number']": {
    MozAppearance: "textfield", // Elimina las flechas en Firefox
    "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
      WebkitAppearance: "none", // Elimina las flechas en WebKit (Chrome, Safari, Edge)
      margin: 0, // Asegura que no haya espacio extra
    },
  },
};

export const autocompleteStyles = {
  '& .MuiAutocomplete-popper': {
    '&::-webkit-scrollbar': {
      display: 'none',  // Esto oculta la barra de desplazamiento
    },
    overflow: 'hidden',  // Asegura que no aparezca la barra
  },

  "& .MuiFilledInput-root": {
    borderRadius: 1, // Bordes redondeados
    border: "1px solid", // Borde de 1px
    borderColor: (theme: Theme) => theme.palette.secondary.main, // Color de borde
    backgroundColor: (theme: Theme) => theme.palette.secondary.main, // Fondo
  },
  "& .MuiInputBase-root": {
    "&:after": {
      borderBottom: "0px", // Sin borde inferior
    },
    "&:before": {
      borderBottom: "0px", // Sin borde inferior
    },
    overflow: "hidden", // Eliminar la barra de desplazamiento
  },
};

export const toogleStyles = {
  backgroundColor: (theme: Theme) => theme.palette.background.default, // Color de fondo
  color: "white",
  border: "0px",
  "&:hover": {
    backgroundColor: (theme: Theme) => theme.palette.secondary.main, // Cambia el color de fondo al pasar el cursor
    color: "white", // Color de texto al pasar el cursor, si quieres que cambie
  },
  "&.Mui-selected": {
    backgroundColor: (theme: Theme) => theme.palette.primary.main, // Color de fondo cuando está seleccionado
    color: "white", // Color de texto cuando está seleccionado
    "&:hover": {
      backgroundColor: (theme: Theme) => theme.palette.secondary.main, // Color de fondo al pasar el cursor cuando está seleccionado
    },
  },
};

export const selectInputStyles = {
  backgroundColor: (theme: Theme) => theme.palette.background.default, // Fondo con color de tema
  borderRadius: 2, // Bordes redondeados
  border: "1px solid ", // Borde de 1px
  borderColor: (theme: Theme) => theme.palette.primary.main, // Color de borde

  "& .MuiSelect-root": {
    "&:after": {
      borderBottom: "none", // Sin borde inferior
    },
    "&:before": {
      borderBottom: "none", // Sin borde inferior
    },
  },
};
