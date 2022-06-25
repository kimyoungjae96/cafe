import React from 'react';
import { Marker } from 'react-native-nmap';
import { normalMapPin } from '@/assets/images/map';
import { LatLng } from '@/infra/types';
import { isCoordinate } from '@/infra/utils';

export const emptyCoordinate: LatLng = {
  latitude: 0,
  longitude: 0,
};

export const NormalMapPin: React.FC<{
  name: string;
  location: LatLng;
}> = ({ name, location }) => {
  const coordinate = isCoordinate(location) ? { ...location } : emptyCoordinate;
  return (
    <Marker
      key={name}
      coordinate={coordinate}
      animated={false}
      width={30}
      height={31}
      image={normalMapPin}
    />
  );
};
