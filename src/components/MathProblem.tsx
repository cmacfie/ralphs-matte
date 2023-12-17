import { useMemo } from "react";
import { IMathProblem, ProblemType } from "@/interfaces";
import s from "@/styles/mathproblem.module.scss";
import layout from "@/styles/layout.module.scss";

const MathProblem = ({
  problem,
  index,
}: {
  problem: IMathProblem;
  index: number;
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
    <div className={s.mathProblem}>
      <div className={s.index}>
        <span>{`${index}`}</span>
      </div>
      <span>{problem.number1}</span>
      <span>{Symbol}</span>
      <span>{problem.number2}</span>
      <span>=</span>
    </div>
  );
};
export default MathProblem;
