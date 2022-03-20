import {StoreSlice} from './type';

type UserState = {
  userId: number;
  name: string;
  setName: (name: string) => void;
};

export const createUserSlice: StoreSlice<UserState> = set => ({
  userId: 0,
  name: '이름',
  setName: (name: string) => set({name}),
});
