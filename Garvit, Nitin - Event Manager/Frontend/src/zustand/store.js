import { create } from 'zustand'

export const useDarkMode = create((set) => ({
    isDarkMode: (() => {
        const savedTheme = localStorage.getItem('user-theme')
        if (savedTheme === 'light') return false;
        if (savedTheme === 'dark') return true;
        return window.matchMedia('(prefers-color-scheme: dark)').matches
    })(),
    toggleTheme: () =>
        set((state) => ({ isDarkMode: !state.isDarkMode }))
}))

export const useInfo = create((set) => ({
  username: "",
  name: "",
  role: "",
  setUsername: (newUsername) => set({ username: newUsername }),
  setName: (newName) => set({ name: newName }),
  setRole: (newRole) => set({role: newRole})
}));