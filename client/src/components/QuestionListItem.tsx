import type { MissedQuestion } from "../types/Question";

export default function QuestionListItem({
  question,
}: {
  question: MissedQuestion;
}) {
  const index = question.index;
  const questionPrompt = question.question.prompt;

  return (
    <li className="border-b-border flex w-full flex-col gap-2 border-b-2 py-6">
      <h4 className="font-semibold">Question #{index + 1}</h4>
      <p className="font-[Quicksand]">{questionPrompt}</p>
    </li>
  );
}
