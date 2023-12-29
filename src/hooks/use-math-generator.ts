import random from "random";
import { IMathProblem, ProblemType } from "@/interfaces";
import useTypeConverter from "@/hooks/use-type-converter";
import { DIFFICULTY, ISettings } from "@/hooks/use-settings";
import useLocalStorage from "@/hooks/use-local-storage";
import { useCallback } from "react";
import MathProblem from "@/components/MathProblem";

//Odds of getting a higher number
const NORMAL_DIST_DEVIATION: {
  [key: string]: number[];
} = {
  [DIFFICULTY.EASY]: [4, 3],
  [DIFFICULTY.MEDIUM]: [13, 3],
  [DIFFICULTY.HARD]: [25, 5],
  [DIFFICULTY.VERY_HARD]: [40, 10],
};

const MIXED_DIFFICULTY_ODDS: {
  [key: string]: number;
} = {
  [DIFFICULTY.EASY]: 0.75,
  [DIFFICULTY.MEDIUM]: 0.25,
  [DIFFICULTY.HARD]: 0.03,
  [DIFFICULTY.VERY_HARD]: 0.01,
};

export interface IGroupedProblems {
  EASY: IMathProblem[];
  MEDIUM: IMathProblem[];
  HARD: IMathProblem[];
  VERY_HARD: IMathProblem[];
  [key: string]: IMathProblem[];
}

const useMathGenerator = ({
  multiplicationRange,
  additionRange,
  difficulty: selectedDifficulty = DIFFICULTY.MIXED,
}: ISettings) => {
  const {
    StringToMathProblemType,
    DifficultyToNumber,
    MultiplicationValueToDifficulty,
  } = useTypeConverter();
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

  const createMultiplication = () => {
    let number1 = getRandomMultiplication();
    let number2 = getRandomMultiplication();
    let difficulty = MultiplicationValueToDifficulty(number1, number2);
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
  const createDivision = () => {
    const answer = getRandomMultiplication();
    const number2 = getRandomMultiplication();
    let difficulty = MultiplicationValueToDifficulty(answer, number2);
    return {
      number1: answer * number2,
      number2: number2,
      type: ProblemType.DIVISION,
      answer: answer,
      difficulty,
    };
  };

  const _createProblem = (type: ProblemType): IMathProblem => {
    let currDifficulty = selectedDifficulty;
    if (selectedDifficulty === DIFFICULTY.MIXED) {
      currDifficulty = getMixedDifficulty();
    }

    switch (type) {
      case ProblemType.ADDITION:
        return createAddition(currDifficulty);
      case ProblemType.SUBTRACTION:
        return createSubtraction(currDifficulty);
      case ProblemType.MULTIPLICATION:
        return createMultiplication();
      case ProblemType.DIVISION:
        return createDivision();
    }
  };

  const sortByDifficulty = (a: IMathProblem, b: IMathProblem) => {
    return DifficultyToNumber(a.difficulty) - DifficultyToNumber(b.difficulty);
  };

  const generateArray = useCallback(
    (types: (ProblemType | undefined)[], quantity: number) => {
      let problems: IMathProblem[] = [];
      for (let i = 0; i < quantity; i++) {
        const type = types[random.integer(0, types.length - 1)];
        if (type !== undefined) {
          problems.push(_createProblem(type));
        }
      }
      problems = problems.sort(sortByDifficulty);
      setItem("problems", JSON.stringify(problems));
      return problems;
    },
    [],
  );

  const generateGrouped = (
    types: (ProblemType | undefined)[],
    quantity: number,
  ): IGroupedProblems => {
    let grouped: IGroupedProblems = {
      EASY: [],
      MEDIUM: [],
      HARD: [],
      VERY_HARD: [],
    };
    for (let i = 0; i < quantity; i++) {
      const type = types[random.integer(0, types.length - 1)];
      if (type !== undefined) {
        const problem = _createProblem(type);
        grouped = {
          ...grouped,
          [problem.difficulty]: [...grouped[problem.difficulty], problem].sort(
            sortByDifficulty,
          ),
        };
      }
    }
    setItem("groupedProblems", JSON.stringify(grouped));
    return grouped;
  };

  const getSavedProblems = (): IMathProblem[] => {
    const items = getItem("problems");
    if (items) {
      return JSON.parse(items) as IMathProblem[];
    }
    return [];
  };

  return { generateGrouped, generateArray, toProblemTypes, getSavedProblems };
};

export default useMathGenerator;
