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
    <>
      {problems.map((p, i) => (
        <div className={s.answer}>
          <div
            className={classNames(
              MathCss.index,
              MathCss.small,
              MathCss.inverted,
            )}
          >
            <span>{i + 1}</span>
          </div>
          {p.answer}
        </div>
      ))}
    </>
  );
};

const PrintComponent = forwardRef<Ref, IPrintComponent>(
  ({ problems, className, ...p }, ref) => {
    return (
      <div
        {...p}
        className={classNames(className, s.printComponent, "print")}
        ref={ref}
      >
        <div className={s.page}>
          <h1 className={s.header}>Ralphs mattetal</h1>
          <div className={s.outerInner}>
            <div className={s.problems}>
              {problems.map((p, i) => (
                <MathProblem inverted problem={p} index={i + 1} />
              ))}
            </div>
            {/*<div className={s.page}>*/}
              <div className={s.answersOuter}>
                <div className={s.answers}>
                  <h1 className={s.header}>Facit</h1>
                  <Answers problems={problems} />
                </div>
              </div>
            {/*</div>*/}
          </div>
        </div>
        {/*<div className={s.page}>*/}
        {/*  <div className={s.answersOuter}>*/}
        {/*    <div className={s.answers}>*/}
        {/*      <h1 className={s.header}>Facit</h1>*/}
        {/*      <Answers problems={problems} />*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</div>*/}
      </div>
    );
  },
);
export default PrintComponent;
