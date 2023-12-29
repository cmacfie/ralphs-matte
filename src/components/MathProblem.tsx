import { SyntheticEvent, useEffect, useMemo, useRef, useState } from "react";
import { IMathProblem, ProblemType } from "@/interfaces";
import s from "@/styles/mathproblem.module.scss";
import classNames from "classnames";
import { DIFFICULTY } from "@/hooks/use-settings";
import Icon, { Icons } from "./Icon";

const MathProblem = ({
  className = "",
  problem,
  index,
  key,
  showAnswer,
  inverted,
  hasInput,
}: {
  className?: string;
  problem: IMathProblem;
  index?: number;
  key: string;
  showAnswer?: boolean;
  inverted?: boolean;
  hasInput?: boolean;
}) => {
  const [value, setValue] = useState("");
  const inputTimeout = useRef<NodeJS.Timeout | null>(null);
  const incorrectTimeout = useRef<NodeJS.Timeout | null>(null);
  const correctTimeout = useRef<NodeJS.Timeout | null>(null);
  const [incorrect, setIncorrect] = useState(false);
  const [correct, setCorrect] = useState(false);

  const Symbol = useMemo(() => {
    switch (problem.type) {
      case ProblemType.ADDITION:
        return "+";
      case ProblemType.SUBTRACTION:
        return "−";
      case ProblemType.MULTIPLICATION:
        return "×";
      case ProblemType.DIVISION:
        return "÷";
    }
  }, [problem]);

  const difficultyClass = useMemo(() => {
    switch (problem.difficulty) {
      case DIFFICULTY.EASY:
        return s.easy;
      case DIFFICULTY.MEDIUM:
        return s.medium;
      case DIFFICULTY.HARD:
        return s.hard;
      case DIFFICULTY.VERY_HARD:
        return s.veryhard;
      case DIFFICULTY.MIXED:
        return "";
    }
  }, [problem.difficulty]);

  const handleInput = (e: SyntheticEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  useEffect(() => {
    if (value) {
      if (inputTimeout.current) {
        clearTimeout(inputTimeout.current);
      }
      inputTimeout.current = setTimeout(() => {
        if (parseInt(value) === problem.answer) {
          setCorrect(true);
        } else {
          setIncorrect(true);
        }
      }, 500);
    }
  }, [value]);

  useEffect(() => {
    if (incorrect) {
      if (incorrectTimeout.current) {
        clearTimeout(incorrectTimeout.current);
      }
      incorrectTimeout.current = setTimeout(() => {
        setIncorrect(false);
        setValue("");
      }, 500);
    }
  }, [incorrect]);

  return (
    <div className={classNames(className, s.mathProblem)} key={key}>
      {index && (
        <div
          className={classNames(
            s.index,
            inverted ? s.inverted : null,
            difficultyClass,
          )}
        >
          <span>{`${index}`}</span>
        </div>
      )}
      <span>{problem.number1}</span>
      <span>{Symbol}</span>
      <span>{problem.number2}</span>
      <>
        <span>=</span>
        <div
          className={classNames(s.answerRow, incorrect ? s.incorrect : null)}
        >
          {!correct && hasInput && (
            <input
              type="number"
              disabled={correct}
              value={value}
              onChange={handleInput}
            />
          )}
          {correct && (
            <div className={s.correct}>
              <span>{problem.answer}</span>
              <Icon icon={Icons.CHECK} />
            </div>
          )}
          <div className={s.answerRowInner}></div>
        </div>
      </>
    </div>
  );
};
export default MathProblem;
