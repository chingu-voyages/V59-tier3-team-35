import { useState } from "react";
import { useFlashCardActions, useFlipped } from "../stores/flashcardStore";
import { cn } from "../utils/cn";

export default function Checkboxes() {
  const [selected, setSelected] = useState<number | null>(null);
  const flipped = useFlipped();

  const { flip } = useFlashCardActions();

  const handleCheckboxChange = (index: number) => {
    if (selected == index) {
      setSelected(null);
    } else {
      setSelected(index);
    }
  };
  const handleFlip = () => {
    flip();
  };

  const answers = [
    {
      id: 1,
      text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    },
    {
      id: 2,
      text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nobis!",
    },
    {
      id: 3,
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem adipisci iusto nesciunt.",
    },
    {
      id: 4,
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, neque.",
    },
  ];

  return (
    <>
      <ul className="flex flex-col gap-4">
        {flipped
          ? answers.map(
              (answer) =>
                answer.id === selected && (
                  <li key={answer.id} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id={`answer-${answer.id}`}
                      checked={true}
                      className="h-8 w-8 shrink-0 appearance-none rounded-sm border-2 border-[#2699fb] transition-all checked:bg-[#2699fb]"
                    />
                    <label htmlFor={`answer-${answer.id}`}>{answer.text}</label>
                  </li>
                ),
            )
          : null}
        {!flipped &&
          answers.map((answer) => (
            <li key={answer.id} className="flex items-center gap-2">
              <input
                type="checkbox"
                id={`answer-${answer.id}`}
                checked={selected === answer.id}
                onChange={() => handleCheckboxChange(answer.id)}
                className="h-8 w-8 shrink-0 cursor-pointer appearance-none rounded-sm border-2 border-[#2699fb] transition-all checked:bg-[#2699fb]"
              />
              <label htmlFor={`answer-${answer.id}`} className="cursor-pointer">
                {answer.text}
              </label>
            </li>
          ))}
      </ul>
      <button
        className={cn(
          "m-auto w-fit cursor-pointer rounded-md border-2 border-[#2699fb] px-16 py-2 text-center",
          selected === null || flipped ? "invisible" : "",
        )}
        onClick={handleFlip}
      >
        Flip
      </button>
    </>
  );
}
