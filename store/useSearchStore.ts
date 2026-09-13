import { create } from 'zustand';

interface SearchStore {
  isSearchOpen: boolean;
  isMenuOpen: boolean;
  searchQuery: string;

  openSearch: () => void;
  closeSearch: () => void;
  toggleSearch: () => void;
  setSearchQuery: (query: string) => void;

  openMenu: () => void;
  closeMenu: () => void;
  toggleMenu: () => void;
}

export const useSearchStore = create<SearchStore>((set) => ({
  isSearchOpen: false,
  isMenuOpen: false,
  searchQuery: '',

  openSearch: () => set({ isSearchOpen: true, isMenuOpen: false }),
  closeSearch: () => set({ isSearchOpen: false, searchQuery: '' }),
  toggleSearch: () => set((state) => ({ isSearchOpen: !state.isSearchOpen, isMenuOpen: false })),
  setSearchQuery: (searchQuery) => set({ searchQuery }),

  openMenu: () => set({ isMenuOpen: true, isSearchOpen: false }),
  closeMenu: () => set({ isMenuOpen: false }),
  toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen, isSearchOpen: false })),
}));
