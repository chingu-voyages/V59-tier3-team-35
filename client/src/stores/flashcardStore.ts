import { create } from "zustand";
import { fetchQuestions } from "../services/questionsService";
import type { Question } from "../types/Question";
import type { Role } from "../types/Role";

export const MAX_LIVES = 3;

interface FlashCardActions {
  flip: () => void;
  fetchQuestions: (roleKey: Role) => Promise<void>;
  setQuestions: (questions: Question[]) => void;
  setCurrentQuestionIndex: (index: number) => void;
  decrementLives: () => void;
  incrementScore: () => void;
}

type FlashCardState = {
  questions: Question[];
  status: "loading" | "error" | "ready" | "success";
  currentQuestionIndex: number;
  lives: number;
  score: number;
  flipped: boolean;
  actions: FlashCardActions;
};

const useFlashCardStore = create<FlashCardState>((set) => ({
  questions: [],
  status: "ready",
  currentQuestionIndex: 0,
  lives: 3,
  score: 0,
  flipped: false,
  actions: {
    fetchQuestions: async (roleKey: Role = "WEB_DEVELOPER") => {
      set({ status: "loading" });
      try {
        const response = await fetchQuestions(roleKey);

        const questions = response.data.items;
        set({ questions, status: "success" });
        console.log("Fetched questions in store:", questions);
      } catch (error) {
        console.error("Error fetching questions:", error);
        set({ status: "error" });
      }
    },
    setQuestions: (questions: Question[]) => set({ questions }),
    flip: () => set((state) => ({ flipped: !state.flipped })),
    setCurrentQuestionIndex: (index: number) =>
      set({ currentQuestionIndex: index }),
    decrementLives: () =>
      set((state) => ({ lives: Math.max(0, state.lives - 1) })),
    incrementScore: () => set((state) => ({ score: state.score + 1 })),
  },
}));

export const useQuestions = () => useFlashCardStore((state) => state.questions);

export const useFlipped = () => useFlashCardStore((state) => state.flipped);

export const useLives = () => useFlashCardStore((state) => state.lives);

export const useScore = () => useFlashCardStore((state) => state.score);

export const useCurrentQuestionIndex = () =>
  useFlashCardStore((state) => state.currentQuestionIndex);

export const useFlashCardActions = () =>
  useFlashCardStore((state) => state.actions);

export default useFlashCardStore;
