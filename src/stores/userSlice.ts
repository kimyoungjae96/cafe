import { StoreSlice } from './type';

type UserState = {
  userId: number;
  name: string;
  setName: (name: string) => void;
  setToken: (token: string) => void;
  token: string;
};

export const createUserSlice: StoreSlice<UserState> = set => ({
  userId: 0,
  name: '이름',
  token: '1',
  setName: (name: string) => set({ name }),
  setToken: (token: string) => set({ token }),
});
