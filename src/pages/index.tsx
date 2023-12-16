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
import printJS from "print-js";
import ReactToPrint, { useReactToPrint } from "react-to-print";

const ProblemPage = () => {
  const searchParams = useSearchParams();
  const ref = useRef<HTMLDivElement | null>(null);
  const typeParams = searchParams?.get("t") ?? "";
  const [problems, setProblems] = useState<IMathProblem[]>([]);

  const { generateArray, toProblemTypes } = useMathGenerator(
    { min: 1, max: 50 },
    { min: 1, max: 10 },
  );
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
    setProblems(generateArray(types, 20));
  };

  const handlePrint = useReactToPrint({
    content: () => ref.current,
  });

  return (
    <RootLayout>
      <MathButtons />
      <div className={s.problemPage} ref={(el) => (ref.current = el)}>
        <h1>Mattetal</h1>
        <div className={s.wrapper}>
          {problems.map((problem) => (
            <MathProblem {...problem} />
          ))}
        </div>
      </div>
      <div className={s.bottomRow}>
        <NormalButton className={s.grow} onClick={generateProblems}>
          Generara
        </NormalButton>
        <NormalButton onClick={handlePrint}>
          <Icon icon={Icons.PRINT} />
        </NormalButton>
      </div>
    </RootLayout>
  );
};
export default ProblemPage;
