import { useEffect } from "react";
import Flashcard from "../components/Flashcard";
import { useFlashCardActions, useStatus } from "../stores/flashcardStore";

export default function QuizPage() {
  const status = useStatus();

  const { reset } = useFlashCardActions();

  useEffect(() => {
    if (status === "gameover") {
      reset();
    }
  }, []);

  return (
    <div className="flex min-h-screen flex-col px-8 pb-8">
      <Flashcard />
    </div>
  );
}
