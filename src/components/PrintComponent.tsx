import { IMathProblem } from "@/interfaces";
import s from "@/styles/printcomponent.module.scss";
import MathProblem from "@/components/MathProblem";
import {
  forwardRef,
  HTMLAttributes,
  HTMLProps,
  InputHTMLAttributes,
} from "react";
import classNames from "classnames";
import MathCss from "@/styles/mathproblem.module.scss";

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
          {problems.reverse().map((p, i) => (
            <div className={s.answer}>
              <div
                className={classNames(
                  MathCss.index,
                  MathCss.small,
                  MathCss.inverted,
                )}
              >
                <span>{100 - i}</span>
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
      <h1 className={s.header}>Ralphs mattetal</h1>
      <div className={s.problemWrapper}>
        <div className={s.problems}>
          {problems.map((p, i) => (
            <div className={s.problemEntryWrapper}>
              <MathProblem
                className={s.problemEntry}
                inverted
                problem={p}
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
    return (
      <div
        {...p}
        className={classNames(className, s.printComponent, "print")}
        ref={ref}
      >
        <Problems problems={problems} />
        <PageBreak />
        <Answers problems={problems} />
      </div>
    );
  },
);
export default PrintComponent;
