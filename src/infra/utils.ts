import { LatLng } from '@/infra/types';

export const isDarkMode = (
  colorSchemeName: 'light' | 'dark' | null | undefined,
) => {
  return colorSchemeName === 'dark';
};

export const isCoordinate = (coordinate: LatLng | null): boolean => {
  return !!(coordinate && coordinate.latitude && coordinate.longitude);
};
