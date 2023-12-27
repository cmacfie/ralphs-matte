import { useMemo } from "react";
import { IMathProblem, ProblemType } from "@/interfaces";
import s from "@/styles/mathproblem.module.scss";
import layout from "@/styles/layout.module.scss";
import classNames from "classnames";

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

  return (
    <div className={classNames(className, s.mathProblem)} key={key}>
      <div className={classNames(s.index, inverted ? s.inverted : null)}>
        <span>{`${index}`}</span>
      </div>
      <span>{problem.number1}</span>
      <span>{Symbol}</span>
      <span>{problem.number2}</span>
      <span>=</span>
      <div className={s.answerRow}>{showAnswer ? problem.answer : null}</div>
    </div>
  );
};
export default MathProblem;
