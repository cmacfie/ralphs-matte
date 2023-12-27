import { IMathProblem, ProblemType } from "@/interfaces";
import useMathGenerator from "@/hooks/use-math-generator";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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
import Head from "next/head";

const ProblemPage = () => {
  const { getSettings } = useSettings();
  const router = useRouter();
  const ref = useRef<HTMLDivElement | null>(null);
  const [problems, setProblems] = useState<IMathProblem[]>([]);
  const [settings, setSettings] = useState<ISettings>(getSettings());
  const [activeProblemTypes, setActiveProblemTypes] = useState<ProblemType[]>([
    ProblemType.ADDITION,
  ]);
  const [showAnswers, setShowAnswers] = useState(false);

  const { generateArray } = useMathGenerator(settings);
  const { StringToMathProblemType } = useTypeConverter();

  useEffect(() => {
    if (problems.length === 0) {
      generateProblems();
    }
  }, [problems]);

  const generateProblems = () => {
    setShowAnswers(false);
    setProblems(
      generateArray(activeProblemTypes, settings?.numberOfProblems ?? 20),
    );
  };

  const handlePrint = useReactToPrint({
    content: () => ref.current,
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

  const MiddleButton = useCallback(() => {
    if (!showAnswers) {
      return (
        <NormalButton
          className={classNames(s.grow)}
          color={"primary"}
          onClick={() => setShowAnswers(true)}
          chalk
        >
          <Icon icon={Icons.IDEA} />
          VISA SVAR
        </NormalButton>
      );
    } else {
      return (
        <NormalButton
          className={classNames(s.grow)}
          color={"primary"}
          onClick={generateProblems}
          chalk
        >
          <Icon icon={Icons.RELOAD} />
          <span>NYA TAL</span>
        </NormalButton>
      );
    }
  }, [showAnswers]);

  return (
    <>
      <Head>
        <title>Ralphs mattesida</title>
      </Head>
      <RootLayout>
        <MathButtons onChange={onProblemTypesChange} />
        <div className={s.problemPage}>
          <h1 className={s.header}>MATTETAL</h1>
          <div className={s.wrapper}>
            {problems.map((problem, i) => (
              <MathProblem
                key={JSON.stringify(problem)}
                problem={problem}
                index={i + 1}
                showAnswer={showAnswers}
              />
            ))}
          </div>
        </div>
        <div className={s.bottomRow}>
          <NormalButton leveled onClick={() => router.push("/settings")}>
            <Icon icon={Icons.SETTINGS} />
          </NormalButton>
          <MiddleButton />
          <NormalButton
            onClick={handlePrint}
            leveled
            disabled={problems.length === 0}
          >
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
