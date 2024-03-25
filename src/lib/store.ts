import { create } from 'zustand';

type CartStore = {
  cart: number;
  add: () => void;
  remove: () => void;
  removeAll: () => void;
};

type UserData = {
  email: string;
  name: string;
  isSeller: boolean;
  id: string;
};

type UserDataSetter = (userData: UserData) => void;

type UserHook = {
  user: UserData | {};
  setUserLogin: UserDataSetter;
};

export const useCartStore = create<CartStore>((set) => ({
  cart: 0,
  add: () => set((state) => ({ cart: state.cart + 1 })),
  remove: () => set((state) => ({ cart: state.cart - 1 })),
  removeAll: () => set({ cart: 0 }),
}));

export const useUserData = create<UserHook>((set) => ({
  user: {},
  setUserLogin: (userData: UserData) =>
    set((state) => ({ user: userData })),
}));
