import { useEffect } from "react";
import LeafIcon from "../icons/LeafIcon";
import {
  MAX_LIVES,
  useCurrentQuestionIndex,
  useFlashCardActions,
  useLives,
  useQuestions,
} from "../stores/flashcardStore";
import { useRole } from "../stores/userStore";
import { cn } from "../utils/cn";
import Checkboxes from "./Checkboxes";

export default function Flashcard() {
  const roleTitle = useRole();

  const currentLives = useLives();

  const { fetchQuestions } = useFlashCardActions();

  useEffect(() => {
    console.log("Fetching questions...");
    if (!roleTitle) return;
    fetchQuestions(roleTitle);
  }, []);

  const questions = useQuestions();
  const currentQuestionIndex = useCurrentQuestionIndex();
  const questionTitle =
    questions[currentQuestionIndex]?.prompt || "Question Title";

  return (
    <div className="bg-primary mx-auto flex w-full max-w-3xl flex-col gap-4 overflow-hidden rounded-t-2xl">
      <div className="relative w-full">
        <img
          src="/flashcard-bg-image.jpg"
          alt="Flashcard Background Image"
          className="absolute inset-0 z-10 h-full w-full object-cover"
        />
        <div className="bg-background absolute inset-0 z-10 opacity-75" />
        <div className="relative z-10 flex flex-col gap-8 p-4 px-6 md:p-8 md:px-12">
          <h2 className="text-center text-3xl font-semibold capitalize lg:text-4xl">
            {roleTitle?.replace(/_/g, " ")}
          </h2>
          <div className="flex items-center gap-2">
            <progress
              value={currentQuestionIndex}
              max={questions.length}
              className="progress-bar h-4 flex-1 rounded-lg bg-white"
            />
            <span className="font-[Quicksand] font-semibold">
              {Math.floor((currentQuestionIndex / questions.length) * 100)}%
            </span>
          </div>

          <div className="text-accent flex w-full justify-end gap-1">
            {Array.from({ length: currentLives }).map((_, index) => (
              <LeafIcon key={index} />
            ))}
            {Array.from({ length: MAX_LIVES - currentLives }).map(
              (_, index) => (
                <LeafIcon key={index} filled={false} />
              ),
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 p-8">
        <h3 className={cn("py-2 text-2xl font-semibold transition-opacity")}>
          Question {currentQuestionIndex + 1}
        </h3>
        <p
          className={cn(
            "border-b border-b-2 border-[#C5C0B0] py-2 text-base/7 transition-opacity",
          )}
        >
          {questionTitle}
        </p>
        <Checkboxes />
      </div>
    </div>
  );
}
