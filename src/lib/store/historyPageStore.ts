import { create } from 'zustand';

export type ProfileTabType = 'saved-history' | 'my-posted-history';

type ProfileStore = {
  currentTab: ProfileTabType;
  setTab: (tab: ProfileTabType) => void;
};

export const useProfileStore = create<ProfileStore>()((set) => ({
  currentTab: 'saved-history',
  setTab: (tab: ProfileTabType) => {
    set(() => ({ currentTab: tab }));
  },
}));