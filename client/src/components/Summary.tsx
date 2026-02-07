import RightArrow from "../icons/RightArrow";
import { useQuestions, useScore } from "../stores/flashcardStore";
import ProgressCircle from "./ProgressCircle";

export default function Summary() {
  const finalScore = useScore();
  const questions = useQuestions();
  const totalQuestions = questions.length;

  const percentage = Math.round(
    totalQuestions > 0 ? (finalScore / totalQuestions) * 100 : 0,
  );

  return (
    <div className="flex w-2xl flex-col gap-12 border border-[#a7d7fe] p-8 text-[#2699fb]">
      <div className="m-auto flex flex-col justify-center gap-4">
        <h2 className="m-auto text-2xl">RESULTS</h2>

        <ProgressCircle percentage={percentage} colour="#2699fb" />
        <div className="flex w-full flex-col gap-4">
          <div className="flex justify-between">
            <div className="flex gap-1">
              <div className="aspect-square rounded-md bg-[#2699fb]" />
              Passed
            </div>
            {percentage}%
          </div>
          <div className="flex justify-between">
            <div className="flex gap-1">
              <div className="aspect-square rounded-md bg-[#a7d7fe]" />
              Failed
            </div>
            {100 - percentage}%
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 border-t border-[#a7d7fe] pt-4">
        Review Missed Questions
        <RightArrow />
      </div>
    </div>
  );
}
