import { IMathProblem } from "@/interfaces";
import useMathGenerator from "@/hooks/use-math-generator";
import React, { useEffect, useMemo, useRef, useState } from "react";
import MathProblem from "@/components/MathProblem";
import { useSearchParams } from "next/navigation";
import s from "@/styles/problemPage.module.scss";
import RootLayout from "@/app/layout";
import MathButtons from "@/components/MathButtons";
import NormalButton from "@/components/NormalButton";
import Icon, { Icons } from "@/components/Icon";
import ReactToPrint, { useReactToPrint } from "react-to-print";
import classNames from "classnames";
import useSettings, { ISettings } from "@/hooks/use-settings";
import { useRouter } from "next/router";
import PrintComponent from "@/components/PrintComponent";
import printComponentCss from "@/styles/printcomponent.module.scss";

const ProblemPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const ref = useRef<HTMLDivElement | null>(null);
  const typeParams = searchParams?.get("t") ?? "";
  const [problems, setProblems] = useState<IMathProblem[]>([]);
  const { getSettings } = useSettings();
  const [settings, setSettings] = useState<ISettings>(getSettings());

  useEffect(() => {}, []);

  const { generateArray, toProblemTypes } = useMathGenerator(settings);
  const types = useMemo(() => {
    if (!typeParams) {
      return [];
    }
    return toProblemTypes(typeParams.split(";"));
  }, [typeParams]);

  useEffect(() => {
    generateProblems();
  }, []);

  const generateProblems = () => {
    setProblems(generateArray(types, settings?.numberOfProblems ?? 20));
  };

  const handlePrint = useReactToPrint({
    content: () => ref.current,
    pageStyle: `* { visibility: visible; opacity: 1 !important; position: relative !important; }`,
  });

  return (
    <RootLayout>
      <MathButtons />
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
        <NormalButton onClick={handlePrint}>
          <Icon icon={Icons.PRINT} />
        </NormalButton>
      </div>
      <PrintComponent problems={problems} ref={ref} />
    </RootLayout>
  );
};
export default ProblemPage;
