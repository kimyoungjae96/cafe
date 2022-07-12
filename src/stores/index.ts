import create, { GetState, SetState } from 'zustand';
import { createUserSlice } from './userSlice';
import { createPermissionsSlice } from '@/stores/permissions';

export const useUserStore = create(
  (set: SetState<any>, get: GetState<any>) => ({
    ...createUserSlice(set, get),
  }),
);

export const usePermissionStore = create(
  (set: SetState<any>, get: GetState<any>) => ({
    ...createPermissionsSlice(set, get),
  }),
);
