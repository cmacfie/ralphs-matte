import React, { useEffect, useMemo, useState } from "react";
import s from "@/styles/playpage.module.scss";
import MathProblem from "@/components/MathProblem";
import { IMathProblem, ProblemType } from "@/interfaces";
import RootLayout from "@/app/layout";
import Head from "next/head";
import useMathGenerator from "@/hooks/use-math-generator";
import useSettings from "@/hooks/use-settings";
import MathButtons from "@/components/MathButtons";
import ChalkBoard from "@/components/ChalkBoard";
import Firework from "@/components/Firework";
import Correct from "@/components/Correct";

const PlayPage = () => {
  const [problem, setProblem] = useState<IMathProblem | null>(null);
  const [input, setInput] = useState("");
  const [activeProblemTypes, setActiveProblemTypes] = useState<ProblemType[]>(
    [],
  );
  const { getSettings } = useSettings();
  const { generateArray } = useMathGenerator(getSettings());

  const generateNewProblem = () => {
    const problems = generateArray(activeProblemTypes, 1);
    const problem = problems[0];
    setProblem(problem);
  };
  const onProblemTypesChange = (types: ProblemType[]) => {
    setActiveProblemTypes(types);
  };

  const inputInt = useMemo(() => {
    return parseInt(input);
  }, [input]);

  useEffect(() => {
    if (inputInt === problem?.answer) {
      alert("Rätt!");
    }
  }, [input]);

  useEffect(() => {
    if (!problem) {
      generateNewProblem();
    }
  }, [problem]);

  return (
    <RootLayout>
      <Head>
        <title>Ralphs matteapp - Spela</title>
      </Head>
        <div className={s.overlay}>
            <Correct />
            <Firework />
            <Firework />
            <Firework />
            <Firework />
            <Firework />
            <Firework />
        </div>
      <MathButtons onChange={onProblemTypesChange} />
      <div className={s.playPage}>
        <ChalkBoard>
          {problem && (
            <MathProblem problem={problem} key={"play-page-problem"} />
          )}
        </ChalkBoard>
        <ChalkBoard className={s.inputWrapper}>
          <input
            type={"number"}
            value={input}
            onChange={(e) => setInput(e.currentTarget.value)}
          />
        </ChalkBoard>
      </div>
    </RootLayout>
  );
};
export default PlayPage;
