export const isDarkMode = (
  colorSchemeName: 'light' | 'dark' | null | undefined,
) => {
  return colorSchemeName === 'dark';
};
