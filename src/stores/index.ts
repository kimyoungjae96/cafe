import create, { GetState, SetState } from 'zustand';
import { createUserSlice } from './userSlice';

export const useUserStore = create(
  (set: SetState<any>, get: GetState<any>) => ({
    ...createUserSlice(set, get),
  }),
);
