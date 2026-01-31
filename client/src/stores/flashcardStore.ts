import { create } from "zustand";

interface FlashCardActions {
  flip: () => void;
}

type FlashCardState = {
  flipped: boolean;
  actions: FlashCardActions;
};

const useFlashCardStore = create<FlashCardState>((set) => ({
  flipped: false,
  actions: {
    flip: () => set((state) => ({ flipped: !state.flipped })),
  },
}));

export const useFlipped = () => useFlashCardStore((state) => state.flipped);

export const useFlashCardActions = () =>
  useFlashCardStore((state) => state.actions);

export default useFlashCardStore;
