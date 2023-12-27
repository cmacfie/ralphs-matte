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
  const [printing, setPrinting] = useState(false);

  const { generateArray } = useMathGenerator(settings);

  useEffect(() => {
    if (problems.length === 0) {
      generateProblems();
    }
  }, []);

  useEffect(() => {
    if (activeProblemTypes.length > 0) {
      generateProblems();
    }
  }, [activeProblemTypes]);

  const generateProblems = () => {
    setPrinting(false);
    const generatedProblems = generateArray(
      activeProblemTypes,
      settings?.numberOfProblems,
    );
    setProblems(generatedProblems);
  };

  const handlePrint = useReactToPrint({
    content: () => {
      setPrinting(false);
      return ref.current;
    },
  });

  useEffect(() => {
    if(printing && ref.current) {
      handlePrint();
    }
  }, [printing, ref.current]);

  const onProblemTypesChange = (types: ProblemType[]) => {
    setActiveProblemTypes(types);
  };

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
                key={JSON.stringify(problem) + i}
                problem={problem}
                index={i + 1}
              />
            ))}
          </div>
        </div>
        <div className={s.bottomRow}>
          <NormalButton leveled onClick={() => router.push("/settings")}>
            <Icon icon={Icons.SETTINGS} />
          </NormalButton>
          <NormalButton
            className={classNames(s.grow)}
            color={"primary"}
            onClick={generateProblems}
            chalk
          >
            <Icon icon={Icons.RELOAD} />
            <span>NYA TAL</span>
          </NormalButton>
          <NormalButton
            onClick={() => setPrinting(true)}
            leveled
            disabled={problems.length === 0}
          >
            <Icon icon={Icons.PRINT} />
          </NormalButton>
        </div>
      </RootLayout>
      {printing && (
        <div style={{ display: "none" }}>
          <PrintComponent problems={problems} ref={ref} />
        </div>
      )}
    </>
  );
};
export default ProblemPage;
