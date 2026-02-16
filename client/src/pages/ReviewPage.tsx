import QuestionListItem from "../components/QuestionListItem";
import { useMissedQuestions } from "../stores/flashcardStore";

export default function ReviewPage() {
  const missedQuestions = useMissedQuestions();

  return (
    <div className="mx-auto flex max-h-screen min-h-screen w-1/2 flex-col gap-4 px-8 pb-8">
      <h2 className="mx-auto text-2xl md:text-3xl lg:text-4xl">
        Question List
      </h2>
      <p className="mx-auto">Role Title</p>
      <ul className="custom-scrollbar max-h-100 overflow-y-auto pr-8">
        {missedQuestions.map((question) => (
          <QuestionListItem key={question.question.id} question={question} />
        ))}
      </ul>
    </div>
  );
}
