import FavoriteIcon from "../icons/FavoriteIcon";
import {
  MAX_LIVES,
  useCurrentQuestionIndex,
  useFlipped,
  useLives,
  useQuestions,
} from "../stores/flashcardStore";
import { cn } from "../utils/cn";
import Checkboxes from "./Checkboxes";

export default function Flashcard() {
  const roleTitle = "ROLE TITLE";

  const currentLives = useLives();

  const questions = useQuestions();
  const currentQuestionIndex = useCurrentQuestionIndex();
  const questionTitle =
    questions[currentQuestionIndex]?.questionTitle || "Question Title";
  const questionDescription =
    questions[currentQuestionIndex]?.questionDescription ||
    "Question Description";

  const flipped = useFlipped();

  return (
    <div className="bg-primary flex w-2xl flex-col gap-4 border border-[#a7d7fe] text-[#2699fb]">
      <div className="flex flex-col gap-8 bg-[#a7d7fe] p-8 px-12">
        <h2 className="text-center text-2xl font-bold text-[#2699fb]">
          {roleTitle}
        </h2>
        <div className="flex items-center gap-2">
          <progress
            value={currentQuestionIndex}
            max={questions.length}
            className="h-4 flex-1 rounded-lg bg-white text-[#2699fb]"
          />
          <span>
            {Math.floor((currentQuestionIndex / questions.length) * 100)}%
          </span>
        </div>

        <div className="flex w-full justify-end gap-1">
          {Array.from({ length: currentLives }).map((_, index) => (
            <FavoriteIcon key={index} />
          ))}
          {Array.from({ length: MAX_LIVES - currentLives }).map((_, index) => (
            <FavoriteIcon key={index} filled={false} />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-4 p-8">
        <h3
          className={cn(
            "py-2 text-2xl font-semibold transition-opacity",
            flipped ? "pointer-events-none opacity-0" : "",
          )}
        >
          {questionTitle}
        </h3>
        <p
          className={cn(
            "border-b border-b-2 border-[#a7d7fe] py-2 transition-opacity",
            flipped ? "pointer-events-none opacity-0" : "",
          )}
        >
          {questionDescription}
        </p>
        <Checkboxes />
      </div>
    </div>
  );
}
