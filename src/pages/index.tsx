import { IMathProblem, ProblemType } from "@/interfaces";
import useMathGenerator from "@/hooks/use-math-generator";
import React, { useEffect, useMemo, useRef, useState } from "react";
import MathProblem from "@/components/MathProblem";
import { useSearchParams } from "next/navigation";
import s from "@/styles/problemPage.module.scss";
import RootLayout from "@/app/layout";
import MathButtons, { ToggledMathTypes } from "@/components/MathButtons";
import NormalButton from "@/components/NormalButton";
import Icon, { Icons } from "@/components/Icon";
import { useReactToPrint } from "react-to-print";
import classNames from "classnames";
import useSettings, { ISettings } from "@/hooks/use-settings";
import { useRouter } from "next/router";
import PrintComponent from "@/components/PrintComponent";
import useTypeConverter from "@/hooks/use-type-converter";

const ProblemPage = () => {
  const { getSettings } = useSettings();
  const router = useRouter();
  const ref = useRef<HTMLDivElement | null>(null);
  const [problems, setProblems] = useState<IMathProblem[]>([]);
  const [settings, setSettings] = useState<ISettings>(getSettings());
  const [activeProblemTypes, setActiveProblemTypes] = useState<ProblemType[]>([
    ProblemType.ADDITION,
  ]);

  const { generateArray } = useMathGenerator(settings);
  const { StringToMathProblemType } = useTypeConverter();


  const generateProblems = () => {
    setProblems(
      generateArray(activeProblemTypes, settings?.numberOfProblems ?? 20),
    );
  };

  const handlePrint = useReactToPrint({
    content: () => ref.current,
    pageStyle: `* { visibility: visible; opacity: 1 !important; position: relative !important; }`,
  });

  const onProblemTypesChange = (types: ToggledMathTypes) => {
    const updatedProblemTypes = Object.entries(types).reduce(
      (all: ProblemType[], [key, isToggled]) => {
        const problemType = StringToMathProblemType(key);
        if (isToggled && problemType) {
          return [...all, problemType];
        }
        return all;
      },
      [],
    );
    setActiveProblemTypes(updatedProblemTypes);
  };

  return (
    <>
      <RootLayout>
        <MathButtons onChange={onProblemTypesChange} />
        <div className={s.problemPage}>
          <h1 className={s.header}>Mattetal</h1>
          <div className={s.wrapper}>
            {problems.map((problem, i) => (
              <MathProblem problem={problem} index={i + 1} />
            ))}
          </div>
        </div>
        <div className={s.bottomRow}>
          <NormalButton onClick={() => router.push("/settings")}>
            <Icon icon={Icons.SETTINGS} />
          </NormalButton>
          <NormalButton
            className={classNames(s.grow)}
            color={"primary"}
            onClick={generateProblems}
          >
            <Icon icon={Icons.RELOAD} />
          </NormalButton>
          <NormalButton onClick={handlePrint} disabled={problems.length === 0}>
            <Icon icon={Icons.PRINT} />
          </NormalButton>
        </div>
      </RootLayout>
      <div style={{ display: "none" }}>
        <PrintComponent problems={problems} ref={ref} />
      </div>
    </>
  );
};
export default ProblemPage;
