import { create } from "zustand";

export interface UserState {
  profile: string;
  name: string;
  setUserProfile: (link: string) => void;
  setUserName: (name: string) => void;
}

const useUserStore = create<UserState>((set: (arg0: { profile?: string; name?: string; }) => void) => ({
  profile: "",
  name: "",
  setUserProfile: (link: string) => {
    set({ profile: link });
  },
  setUserName: (name: string) => {
    set({ name: name });
  },
}));

export default useUserStore;
