import { create } from 'zustand';

export const useDeleteStore = create((set) => ({
    confirmDeleteVisible: false,
    successDeleteVisible: false,
    setConfirmDeleteVisible: (value: boolean) => set({ confirmDeleteVisible: value }),
    setSuccessDeleteVisible: (value: boolean) => set({ successDeleteVisible: value }),
}))


export const useDatePicker = create((set) => ({
    historyDate: null,
    setHistoryDate: (value: Date | null) => set({ historyDate: value }),
}))