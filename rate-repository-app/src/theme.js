import { Platform } from "react-native";

const theme = {
  colors: {
    textPrimary: '#24292e',
    textSecondary: '#586069',
    primary: '#0366d6',
    barBackground: '#24292e',
    mainBackground: '#e1e4e8'
  },
  fontSizes: {
    body: 14,
    subheading: 16,
  },
  fonts: Platform.select({
    android: 'sans-serif',
    ios: 'Arial',
    default: 'System',
  }),
  fontWeights: {
    normal: '400',
    bold: '700',
  },
};

export default theme;