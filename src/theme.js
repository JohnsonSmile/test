import { createTheme } from "@mui/material/styles";

const textPrimaryColor = "#fff";

let theme = createTheme({
  typography: {
    allVariants: {
      fontWeightRegular: 400,
      fontsize: 14,
      color: textPrimaryColor,
      fontFamily: "Bronova",
    },
  },
  palette: {
    main: "#1bec65",
  },
});

// theme = responsiveFontSizes(theme);

export default theme;
