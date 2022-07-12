import { StoreSlice } from './type';
import { Permission, PERMISSIONS, request } from 'react-native-permissions';
import { isIOS } from '@/infra';

enum PermissionType {
  LOCATION_FG = 'locationFg',
  CAMERA = 'camera',
}

const PermissionMap: { [k in PermissionType]: Permission } = isIOS
  ? {
      locationFg: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
      camera: PERMISSIONS.IOS.CAMERA,
    }
  : {
      locationFg: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      camera: PERMISSIONS.ANDROID.CAMERA,
    };

type PermissionsState = {
  locationPermission: boolean;
  requestGeolocationPermission: () => void;
};

export const createPermissionsSlice: StoreSlice<PermissionsState> = set => ({
  locationPermission: false,
  requestGeolocationPermission: () => {
    request(PermissionMap[PermissionType.LOCATION_FG]);
  },
});
