import { useMemo } from "react";
import { IMathProblem, ProblemType } from "@/interfaces";
import s from "@/styles/mathproblem.module.scss";
import layout from "@/styles/layout.module.scss";
import classNames from "classnames";
import useMathGenerator from "@/hooks/use-math-generator";
import {DIFFICULTY} from "@/hooks/use-settings";

const MathProblem = ({
  className = "",
  problem,
  index,
  key,
  showAnswer,
  inverted,
}: {
  className?: string;
  problem: IMathProblem;
  index: number;
  key: string;
  showAnswer?: boolean;
  inverted?: boolean;
}) => {
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
  }, [problem.difficulty])

  return (
    <div className={classNames(className, s.mathProblem)} key={key}>
      <div className={classNames(s.index, inverted ? s.inverted : null, difficultyClass)}>
        <span>{`${index}`}</span>
      </div>
      <span>{problem.number1}</span>
      <span>{Symbol}</span>
      <span>{problem.number2}</span>
      <span>=</span>
      <div className={s.answerRow}>
          {showAnswer ? problem.answer : null}
        <div className={s.answerRowInner}>
        </div>
      </div>
    </div>
  );
};
export default MathProblem;
