import { useState } from "react";
import {
  useCurrentQuestionIndex,
  useFlashCardActions,
  useFlipped,
  useQuestions,
} from "../stores/flashcardStore";
import { cn } from "../utils/cn";

export default function Checkboxes() {
  const [selected, setSelected] = useState<number | null>(null);

  const questions = useQuestions();
  const currentQuestionIndex = useCurrentQuestionIndex();
  const answers = questions[currentQuestionIndex]?.answers || [
    { id: 1, text: "Answer 1" },
    { id: 2, text: "Answer 2" },
    { id: 3, text: "Answer 3" },
    { id: 4, text: "Answer 4" },
  ];

  const correctAnswerId = questions[currentQuestionIndex]?.correctAnswerId;

  const flipped = useFlipped();

  const { flip } = useFlashCardActions();

  const handleCheckboxChange = (index: number) => {
    if (selected == index) {
      setSelected(null);
    } else {
      setSelected(index);
    }
  };

  const { setCurrentQuestionIndex, decrementLives } = useFlashCardActions();

  const handleCheckAnswer = () => {
    if (selected !== correctAnswerId) {
      decrementLives();
    }
    flip();
  };

  const handleNext = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setSelected(null);
    flip();
  };

  return (
    <>
      <ul className="flex flex-col gap-4">
        {answers.map((answer) => (
          <li
            key={answer.id}
            className={cn(
              "flex items-center gap-2 transition-opacity",
              flipped && selected !== answer.id && answer.id !== correctAnswerId
                ? "pointer-events-none opacity-0"
                : "",
            )}
          >
            <input
              type="checkbox"
              id={`answer-${answer.id}`}
              checked={selected === answer.id}
              onChange={() => handleCheckboxChange(answer.id)}
              className={cn(
                "h-8 w-8 shrink-0 cursor-pointer appearance-none rounded-sm border-2 border-[#2699fb] transition-all checked:bg-[#2699fb]",
                flipped
                  ? answer.id === correctAnswerId
                    ? "border-green-500 checked:bg-green-500"
                    : "border-red-500 checked:bg-red-500"
                  : "",
              )}
            />
            <label htmlFor={`answer-${answer.id}`} className="cursor-pointer">
              {answer.text}
            </label>
          </li>
        ))}
      </ul>

      <button
        className={cn(
          "m-auto w-fit cursor-pointer rounded-md border-2 border-[#2699fb] px-16 py-2 text-center transition-opacity",
          selected === null ? "pointer-events-none opacity-0" : "",
        )}
        onClick={flipped ? handleNext : handleCheckAnswer}
      >
        {flipped ? "Next Question" : "Flip"}
      </button>
    </>
  );
}
