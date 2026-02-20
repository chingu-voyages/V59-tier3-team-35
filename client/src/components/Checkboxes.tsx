import { useNavigate } from "react-router-dom";
import {
  useCurrentQuestionIndex,
  useFlashCardActions,
  useFlipped,
  useQuestions,
  useSelectedAnswer,
  useStatus,
} from "../stores/flashcardStore";
import { cn } from "../utils/cn";

export default function Checkboxes() {
  const selected = useSelectedAnswer();

  const navigate = useNavigate();

  const questions = useQuestions();
  const currentQuestionIndex = useCurrentQuestionIndex();
  const answers = questions[currentQuestionIndex]?.choices || [
    { id: 1, text: "Answer 1", isCorrect: false },
    { id: 2, text: "Answer 2", isCorrect: false },
    { id: 3, text: "Answer 3", isCorrect: false },
    { id: 4, text: "Answer 4", isCorrect: false },
  ];

  const correctAnswerId =
    answers.find((answer) => answer.isCorrect)?.id || null;

  const flipped = useFlipped();

  const { flip, incrementScore, setSelectedAnswer } = useFlashCardActions();

  const handleCheckboxChange = (index: number) => {
    if (selected == index) {
      setSelectedAnswer(null);
    } else {
      setSelectedAnswer(index);
    }
  };

  const { setCurrentQuestionIndex, decrementLives, endQuiz } =
    useFlashCardActions();

  const handleCheckAnswer = () => {
    if (selected !== correctAnswerId) {
      decrementLives();
    } else {
      incrementScore();
    }
    flip();
  };

  const status = useStatus();

  const handleNext = () => {
    const isLastQuestion = currentQuestionIndex >= questions.length - 1;

    const isGameover = status === "gameover";

    if (isLastQuestion || isGameover) {
      endQuiz();
      navigate("/summary");
      return;
    }
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setSelectedAnswer(null);
    flip();
  };

  const answerDescription =
    questions[currentQuestionIndex]?.explanation || "Answer Description";

  return (
    <>
      <ul className="flex flex-col gap-4">
        {answers.map((answer) => (
          <li
            key={answer.id}
            className={cn(
              "flex items-center gap-2 transition-opacity",
              flipped ? "pointer-events-none" : "",
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
                "checked:bg-error checked:border-error h-8 w-8 shrink-0 cursor-pointer appearance-none rounded-full border-2 transition-all",
                flipped
                  ? answer.id === correctAnswerId
                    ? "border-success checked:bg-success checked:border-success"
                    : "border-error checked:bg-error"
                  : "",
              )}
            />
            <label
              htmlFor={`answer-${answer.id}`}
              className={cn(
                "cursor-pointer",
                selected === answer.id ? "text-error" : "",
                flipped && answer.id === correctAnswerId ? "text-success" : "",
              )}
            >
              {answer.text}
            </label>
          </li>
        ))}
      </ul>
      {flipped && <p>{answerDescription}</p>}
      <button
        className={cn(
          "border-accent-secondary hover:bg-accent-secondary hover:text-primary ml-auto w-fit cursor-pointer rounded-2xl border-2 px-16 py-2 text-center transition-opacity",
          !flipped && selected === null
            ? "pointer-events-none opacity-0"
            : "opacity-100",
        )}
        onClick={flipped ? handleNext : handleCheckAnswer}
      >
        {flipped ? "Next Question" : "Flip"}
      </button>
    </>
  );
}
