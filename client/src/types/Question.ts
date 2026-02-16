import type { Answer } from "./Answer";

export type Question = {
  id: number;
  prompt: string;
  explanation: string;
  choices: Answer[];
};

export type MissedQuestion = {
  question: Question;
  index: number;
};
