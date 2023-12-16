import { useMemo } from "react";
import { IMathProblem, ProblemType } from "@/interfaces";
import s from "@/styles/mathproblem.module.scss";
import Icon, { Icons } from "@/components/Icon";

const MathProblem = (problem: IMathProblem) => {
  const Symbol = useMemo(() => {
    switch (problem.type) {
      case ProblemType.ADDITION:
        return <Icon icon={Icons.ADDITION} />;
      case ProblemType.SUBTRACTION:
        return <Icon icon={Icons.SUBTRACTION} />;
      case ProblemType.MULTIPLICATION:
        return <Icon icon={Icons.MULTIPLICATION} />;
      case ProblemType.DIVISION:
        return <Icon icon={Icons.DIVISION} />;
    }
  }, [problem]);

  return (
    <div className={s.mathProblem}>
      <span>{problem.number1}</span>
        <span>{Symbol}</span>
        <span>{problem.number2}</span>
      <span>=</span>
    </div>
  );
};
export default MathProblem;
