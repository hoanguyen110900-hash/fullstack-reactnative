import { Platform } from "react-native";
const theme = {
  colors: {
    textPrimary: "#24292e",
    textSecondary: "#586069",
    primary: "#0366d6",
    appBarTabBackground: "#24292e",
    textAppBarTab: "#ffffff",
    mainBackground: "#e1e4e8",
    inputBackground: "#F9FAFB",
    repositoryBackground: "#ffffff",
    borderColor: "#D1D5DB",
    error: "#d73a4a",
  },
  fontSizes: {
    body: 14,
    subheading: 16,
    title: 20,
    titlePlus: 26,
  },
  fonts: {
    main: Platform.select({
      android: "Roboto",
      ios: "Arial",
      default: "System",
    }),
  },
  fontWeights: {
    normal: "400",
    bold: "700",
  },
  spacing: {
    small: 8,
    smallPlus: 12,
    medium: 16,
    large: 24,
  },
};

export default theme;
