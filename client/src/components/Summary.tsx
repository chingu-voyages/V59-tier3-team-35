import { Link } from "react-router-dom";
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
    <div className="bg-primary mx-auto flex w-full max-w-3xl flex-col gap-4 overflow-hidden rounded-t-2xl">
      <div className="relative w-full">
        <img
          src="/background-image.jpg"
          alt="Summary Card Background Image"
          className="absolute inset-0 z-10 h-full w-full object-cover"
        />
        <div className="bg-background absolute inset-0 z-10 opacity-75" />
        <h2 className="relative z-20 p-4 py-12 text-center text-3xl font-semibold lg:text-4xl">
          RESULTS
        </h2>
      </div>
      <div className="m-auto flex w-1/2 flex-col justify-center gap-4 pb-4">
        <ProgressCircle percentage={percentage} colour="#8DA399" />
        <div className="flex w-full flex-col gap-4 font-[Quicksand] text-lg md:text-xl lg:text-2xl">
          <div className="flex justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-success aspect-square h-8 rounded-md md:h-9 lg:h-10" />
              Passed
            </div>
            {percentage}%
          </div>
          <div className="flex justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-error aspect-square h-8 rounded-md md:h-9 lg:h-10" />
              Failed
            </div>
            {100 - percentage}%
          </div>
        </div>
      </div>
      <div className="px-8">
        <div className="border-accent-secondary gap-2 border-t py-16 font-bold">
          <Link to="/review" className="flex items-center gap-2 align-middle">
            Review Missed Questions
            <RightArrow />
          </Link>
        </div>
      </div>
    </div>
  );
}
