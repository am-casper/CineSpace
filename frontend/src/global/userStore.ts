import { create } from "zustand";

export interface UserState {
  profile: string;
  name: string;
  setUserProfile: (link: string) => void;
  setUserName: (name: string) => void;
}

const useUserStore = create<UserState>((set) => ({
  profile: "",
  name: "",
  setUserProfile: (link: string) => {
    set({ profile: link });
  },
  setUserName: (name: string) => {
    set({ profile: name });
  },
}));

export default useUserStore;
