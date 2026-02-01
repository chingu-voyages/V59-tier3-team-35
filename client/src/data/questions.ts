import type { Question } from "../types/Question";

export const defaultQuestions: Question[] = [
  {
    id: 1,
    questionTitle: "What is the capital of France?",
    questionDescription:
      "The capital of France is known for its art, fashion, and cuisine.",
    answers: [
      { id: 1, text: "Berlin" },
      { id: 2, text: "London" },
      { id: 3, text: "Paris" },
      { id: 4, text: "Rome" },
    ],
    correctAnswerId: 3,
  },
  {
    id: 2,
    questionTitle: "Which planet is known as the Red Planet?",
    questionDescription:
      "This planet is known for its reddish appearance due to iron oxide on its surface.",
    answers: [
      { id: 1, text: "Earth" },
      { id: 2, text: "Mars" },
      { id: 3, text: "Jupiter" },
      { id: 4, text: "Saturn" },
    ],
    correctAnswerId: 2,
  },
  {
    id: 3,
    questionTitle: "Who painted the Mona Lisa?",
    questionDescription:
      "The Mona Lisa is a famous painting by Leonardo da Vinci.",
    answers: [
      { id: 1, text: "Vincent van Gogh" },
      { id: 2, text: "Pablo Picasso" },
      { id: 3, text: "Leonardo da Vinci" },
      { id: 4, text: "Michelangelo" },
    ],
    correctAnswerId: 3,
  },
];
