import { IMathProblem, ProblemType } from "@/interfaces";
import useMathGenerator, { IGroupedProblems } from "@/hooks/use-math-generator";
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
import ChalkBoard from "@/components/ChalkBoard";

const ProblemPage = () => {
  const { getSettings } = useSettings();
  const router = useRouter();
  const ref = useRef<HTMLDivElement | null>(null);
  const [problems, setProblems] = useState<IGroupedProblems | null>(null);
  const [settings, setSettings] = useState<ISettings>(getSettings());
  const [activeProblemTypes, setActiveProblemTypes] = useState<ProblemType[]>([
    ProblemType.ADDITION,
  ]);
  const [printing, setPrinting] = useState(false);

  const groupedAsArray = useMemo(() => {
    if (problems) return Object.entries(problems);
  }, [problems]);

  const groupedAsFlattened = useMemo(() => {
    return groupedAsArray?.flatMap(([header, array]) => array) ?? [];
  }, [groupedAsArray]);

  const { generateGrouped } = useMathGenerator(settings);
  const { DifficultyToString } = useTypeConverter();

  useEffect(() => {
    if (problems === null) {
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
    const generatedProblems = generateGrouped(
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
    if (printing && ref.current) {
      handlePrint();
    }
  }, [printing, ref.current]);

  const onProblemTypesChange = (types: ProblemType[]) => {
    setActiveProblemTypes(types);
  };
  let i = 0;

  return (
    <>
      <Head>
        <title>Ralphs mattesida</title>
      </Head>
      <RootLayout>
        <MathButtons onChange={onProblemTypesChange} />
        <ChalkBoard className={s.problemPage}>
          <div className={s.wrapper}>
            {groupedAsArray?.map(([header, problems]) => {
              if (problems.length === 0) {
                return null;
              }
              return (
                <>
                  <h2>{DifficultyToString(header)}</h2>
                  {problems.map((problem) => {
                    let index = i;
                    i++;
                    return (
                      <MathProblem
                        key={JSON.stringify(problem) + index}
                        problem={problem}
                        index={index + 1}
                        hasInput={true}
                      />
                    );
                  })}
                </>
              );
            })}
          </div>
        </ChalkBoard>
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
            disabled={problems === null}
          >
            <Icon icon={Icons.PRINT} />
          </NormalButton>
        </div>
      </RootLayout>
      {printing && (
        <div style={{ display: "none" }}>
          <PrintComponent problems={groupedAsFlattened} ref={ref} />
        </div>
      )}
    </>
  );
};
export default ProblemPage;
