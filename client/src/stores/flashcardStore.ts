import { create } from "zustand";
import { fetchQuestions } from "../services/questionsService";
import type { MissedQuestion, Question } from "../types/Question";
import type { Role } from "../types/Role";

export const MAX_LIVES = 3;

interface FlashCardActions {
  flip: () => void;
  fetchQuestions: (roleKey: Role) => Promise<void>;
  setQuestions: (questions: Question[]) => void;
  setCurrentQuestionIndex: (index: number) => void;
  setSelectedAnswer: (index: number | null) => void;
  decrementLives: () => void;
  incrementScore: () => void;
  endQuiz: () => void;
  reset: () => void;
}

type FlashCardState = {
  questions: Question[];
  missedQuestions: MissedQuestion[];
  status: "loading" | "error" | "ready" | "success" | "gameover";
  currentQuestionIndex: number;
  selectedAnswer: number | null;
  lives: number;
  score: number;
  flipped: boolean;
  actions: FlashCardActions;
};

const useFlashCardStore = create<FlashCardState>((set) => ({
  questions: [],
  missedQuestions: [],
  status: "ready",
  currentQuestionIndex: 0,
  selectedAnswer: null,
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
    setSelectedAnswer: (index: number | null) => set({ selectedAnswer: index }),
    decrementLives: () =>
      set((state) => {
        const newLives = Math.max(0, state.lives - 1);
        const isGameover = newLives === 0;

        const currentIndex = state.currentQuestionIndex;
        const currentQuestion = state.questions[currentIndex];

        return {
          lives: newLives,
          status: isGameover ? "gameover" : state.status,
          missedQuestions: [
            ...state.missedQuestions,
            {
              question: currentQuestion,
              index: currentIndex,
            },
          ],
        };
      }),
    incrementScore: () => set((state) => ({ score: state.score + 1 })),
    endQuiz: () => set({ status: "gameover" }),
    reset: () =>
      set({
        lives: 3,
        score: 0,
        currentQuestionIndex: 0,
        missedQuestions: [],
        status: "ready",
        flipped: false,
      }),
  },
}));

export const useQuestions = () => useFlashCardStore((state) => state.questions);

export const useMissedQuestions = () =>
  useFlashCardStore((state) => state.missedQuestions);

export const useStatus = () => useFlashCardStore((state) => state.status);

export const useSelectedAnswer = () =>
  useFlashCardStore((state) => state.selectedAnswer);

export const useFlipped = () => useFlashCardStore((state) => state.flipped);

export const useLives = () => useFlashCardStore((state) => state.lives);

export const useScore = () => useFlashCardStore((state) => state.score);

export const useCurrentQuestionIndex = () =>
  useFlashCardStore((state) => state.currentQuestionIndex);

export const useFlashCardActions = () =>
  useFlashCardStore((state) => state.actions);

export default useFlashCardStore;
