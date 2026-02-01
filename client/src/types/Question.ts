import type { Answer } from "./Answer";

export type Question = {
  id: number;
  questionTitle: string;
  questionDescription: string;
  answers: Answer[];
  correctAnswerId: number;
};
