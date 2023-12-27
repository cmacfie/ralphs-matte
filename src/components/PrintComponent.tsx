import { IMathProblem } from "@/interfaces";
import s from "@/styles/printcomponent.module.scss";
import MathProblem from "@/components/MathProblem";
import {
  forwardRef,
  HTMLAttributes,
  HTMLProps,
  InputHTMLAttributes,
  useMemo,
} from "react";
import classNames from "classnames";
import MathCss from "@/styles/mathproblem.module.scss";
import useMathGenerator from "@/hooks/use-math-generator";

export interface IPrintComponent extends HTMLProps<HTMLDivElement> {
  problems: IMathProblem[];
}

export type Ref = HTMLDivElement;

const Answers = ({ problems }: { problems: IMathProblem[] }) => {
  return (
    <div className={s.page}>
      <div className={s.answersOuter}>
        <h1 className={s.header}>Facit</h1>
        <div className={s.answers}>
          {problems.map((p, i) => (
            <div className={s.answer}>
              <div
                key={"answer-print" + p.answer}
                className={classNames(
                  MathCss.index,
                  MathCss.small,
                  MathCss.inverted,
                )}
              >
                <span>{problems.length - i}</span>
              </div>
              {p.answer}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Problems = ({ problems }: { problems: IMathProblem[] }) => {
  return (
    <div className={s.page}>
      <h1 className={s.header}>RALPHS MATTETAL</h1>
      <div className={s.problemWrapper}>
        <div className={s.problems}>
          {problems.map((p, i) => (
            <div className={s.problemEntryWrapper}>
              <MathProblem
                className={s.problemEntry}
                inverted
                problem={p}
                showAnswer={false}
                key={"print-" + JSON.stringify(p)}
                index={i + 1}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const PageBreak = () => <div className={s.pageBreak} />;

const PrintComponent = forwardRef<Ref, IPrintComponent>(
  ({ problems, className, ...p }, ref) => {
      const clonedProblems = useMemo(() => [...problems], [problems])
      const reversedProblems = useMemo(() => [...problems].reverse(), [problems]);

    return (
      <div {...p} className={classNames(className, s.printComponent)} ref={ref}>
        <Problems problems={clonedProblems} />
        <PageBreak />
        <Answers problems={reversedProblems} />
      </div>
    );
  },
);
export default PrintComponent;
