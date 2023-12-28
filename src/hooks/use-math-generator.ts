import random from "random";
import { IMathProblem, ProblemType } from "@/interfaces";
import useTypeConverter from "@/hooks/use-type-converter";
import { DIFFICULTY, ISettings } from "@/hooks/use-settings";
import useLocalStorage from "@/hooks/use-local-storage";
import { useCallback } from "react";

//Odds of getting a higher number
const NORMAL_DIST_DEVIATION: {
  [key: string]: number[];
} = {
  [DIFFICULTY.EASY]: [4, 3],
  [DIFFICULTY.MEDIUM]: [13, 3],
  [DIFFICULTY.HARD]: [25, 5],
  [DIFFICULTY.VERY_HARD]: [40, 30],
};

const MIXED_DIFFICULTY_ODDS: {
  [key: string]: number;
} = {
  [DIFFICULTY.EASY]: 0.75,
  [DIFFICULTY.MEDIUM]: 0.25,
  [DIFFICULTY.HARD]: 0.03,
  [DIFFICULTY.VERY_HARD]: 0.01,
};

const useMathGenerator = ({
  multiplicationRange,
  additionRange,
  difficulty = DIFFICULTY.MIXED,
}: ISettings) => {
  const { StringToMathProblemType } = useTypeConverter();
  const { setItem, getItem } = useLocalStorage();

  const toProblemTypes = (problems: string[]) => {
    return problems.map((s) => StringToMathProblemType(s));
  };

  const getMixedDifficulty = (): DIFFICULTY => {
    const r = random.normal();
    const chosen = Object.entries(MIXED_DIFFICULTY_ODDS).reduce(
      (res: { type?: DIFFICULTY; value: number }, [key, value]) => {
        const odds = MIXED_DIFFICULTY_ODDS[key] * r();
        if (odds > res.value) {
          return { type: key as DIFFICULTY, value: odds };
        }
        return res;
      },
      { type: undefined, value: -1 },
    );
    return chosen.type as DIFFICULTY;
  };
  // useEffect(() => {
  //   let res = {
  //     EASY: 0,
  //     HARD: 0,
  //     MEDIUM: 0,
  //     VERY_HARD: 0,
  //   };
  //   for (let i = 0; i < 1000; i++) {
  //     const thisDifficulty = getMixedDifficulty();
  //     console.log(thisDifficulty);
  //     if (thisDifficulty) {
  //       res = { ...res, [thisDifficulty]: res[thisDifficulty] + 1 };
  //     } else {
  //       console.log("NO RETURN");
  //     }
  //   }
  //   console.log(res);
  // }, []);

  const getRandomMultiplication = () => {
    const range = multiplicationRange;
    return random.int(range.min, range.max);
  };

  const getRandomNormalDist = (difficulty: DIFFICULTY) => {
    const poissonRandomizer = random.normal(
      ...NORMAL_DIST_DEVIATION[difficulty],
    );
    let result = -1;
    while (result < 0) {
      result = poissonRandomizer();
    }
    return Math.round(result);
  };

  const createMultiplication = (difficulty: DIFFICULTY) => {
    let number1 = getRandomMultiplication();
    let number2 = getRandomMultiplication();
    const answer = number1 * number2;
    return {
      number1,
      number2,
      answer,
      difficulty,
      type: ProblemType.MULTIPLICATION,
    };
  };

  const createAddition = (difficulty: DIFFICULTY) => {
    let number1 = getRandomNormalDist(difficulty);
    let number2 = getRandomNormalDist(difficulty);
    const answer = number1 + number2;
    return {
      number1,
      number2,
      answer,
      difficulty,
      type: ProblemType.ADDITION,
    };
  };

  const createSubtraction = (difficulty: DIFFICULTY): IMathProblem => {
    let number1 = getRandomNormalDist(difficulty);
    let number2 = getRandomNormalDist(difficulty);
    //Smallest number first in subtraction
    if (number2 > number1) {
      let temp = number1;
      number2 = number1;
      number1 = temp;
    }
    const answer = number1 - number2;
    return {
      number1,
      number2,
      answer,
      difficulty,
      type: ProblemType.SUBTRACTION,
    };
  };
  const createDivision = (difficulty: DIFFICULTY) => {
    const answer = getRandomMultiplication();
    const number2 = getRandomMultiplication();
    return {
      number1: answer * number2,
      number2: number2,
      type: ProblemType.DIVISION,
      answer: answer,
      difficulty,
    };
  };

  const _createProblem = (type: ProblemType): IMathProblem => {
    let currDifficulty = difficulty;
    if (difficulty === DIFFICULTY.MIXED) {
      currDifficulty = getMixedDifficulty();
    }

    switch (type) {
      case ProblemType.ADDITION:
        return createAddition(currDifficulty);
      case ProblemType.SUBTRACTION:
        return createSubtraction(currDifficulty);
      case ProblemType.MULTIPLICATION:
        return createMultiplication(currDifficulty);
      case ProblemType.DIVISION:
        return createDivision(currDifficulty);
    }
  };

  const generateArray = useCallback(
    (types: (ProblemType | undefined)[], quantity: number) => {
      const problems: IMathProblem[] = [];
      for (let i = 0; i < quantity; i++) {
        const type = types[random.integer(0, types.length - 1)];
        if (type !== undefined) {
          problems.push(_createProblem(type));
        }
      }
      setItem("problems", JSON.stringify(problems));
      return problems;
    },
    [],
  );

  const getSavedProblems = (): IMathProblem[] => {
    const items = getItem("problems");
    if (items) {
      return JSON.parse(items) as IMathProblem[];
    }
    return [];
  };

  return {
    generateArray,
    toProblemTypes,
    getSavedProblems,
  };
};

export default useMathGenerator;
