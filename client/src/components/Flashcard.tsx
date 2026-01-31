import FavoriteIcon from "../icons/FavoriteIcon";
import Checkboxes from "./Checkboxes";

export default function Flashcard() {
  const currentProgress = 3;
  const maxProgress = 10;
  const currentLives = 2;
  const maxLives = 3;
  const roleTitle = "ROLE TITLE";
  const questionTitle = "Question text";
  const questionDescription =
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit.";

  return (
    <div className="flex w-2xl flex-col gap-4 border border-[#a7d7fe] text-[#2699fb]">
      <div className="flex flex-col gap-8 bg-[#a7d7fe] p-8 px-12">
        <h2 className="text-center text-2xl font-bold text-[#2699fb]">
          {roleTitle}
        </h2>
        <div className="flex items-center gap-2">
          <progress
            value={currentProgress}
            max={maxProgress}
            className="h-4 flex-1 rounded-lg bg-white text-[#2699fb]"
          />
          <span>{(currentProgress / maxProgress) * 100}%</span>
        </div>

        <div className="flex w-full justify-end gap-1">
          {Array.from({ length: currentLives }).map((_, index) => (
            <FavoriteIcon key={index} />
          ))}
          {Array.from({ length: maxLives - currentLives }).map((_, index) => (
            <FavoriteIcon key={index} filled={false} />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-4 p-8">
        <h3 className="py-2 text-2xl font-semibold">{questionTitle}</h3>
        <p className="border-b border-b-2 border-[#a7d7fe] py-2">
          {questionDescription}
        </p>
        <Checkboxes />
      </div>
    </div>
  );
}
