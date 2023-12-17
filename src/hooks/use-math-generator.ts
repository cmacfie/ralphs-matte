import random from "random";
import { IMathProblem, MinMax, ProblemType } from "@/interfaces";
import useTypeConverter from "@/hooks/use-type-converter";
import { ISettings } from "@/hooks/use-settings";
import useLocalStorage from "@/hooks/use-local-storage";

const useMathGenerator = ({
  multiplicationRange,
  additionRange,
}: ISettings) => {
  const { StringToMathProblemType } = useTypeConverter();
  const { setItem, getItem } = useLocalStorage();

  const toProblemTypes = (problems: string[]) => {
    return problems.map((s) => StringToMathProblemType(s));
  };

  const getNumberInRange = (type: ProblemType) => {
    const minMax =
      type === ProblemType.ADDITION ? additionRange : multiplicationRange;
    return random.int(minMax.min, minMax.max);
  };

  const _calcAnswer = (number1: number, number2: number, type: ProblemType) => {
    switch (type) {
      case ProblemType.ADDITION:
        return number1 + number2;
      case ProblemType.SUBTRACTION:
        return number1 - number2;
      case ProblemType.MULTIPLICATION:
        return number1 * number2;
      case ProblemType.DIVISION:
        return number1 / number2;
    }
  };

  const _createProblem = (type: ProblemType): IMathProblem => {
    if (type === ProblemType.DIVISION) {
      const answer = getNumberInRange(type);
      const smallNumber = random.int(2, 3);
      return {
        number1: answer * smallNumber,
        number2: smallNumber,
        type: ProblemType.DIVISION,
        answer: answer,
      };
    }

    let number1 = getNumberInRange(type);
    let number2 = getNumberInRange(type);
    if (type === ProblemType.SUBTRACTION) {
      //Smallest number first in subtraction
      if (number2 > number1) {
        let temp = number1;
        number2 = number1;
        number1 = temp;
      }
    }
    const answer = _calcAnswer(number1, number2, type);
    return {
      number1,
      number2,
      answer,
      type,
    };
  };

  const generateArray = (
    types: (ProblemType | undefined)[],
    quantity: number,
  ) => {
    const problems: IMathProblem[] = [];
    for (let i = 0; i < quantity; i++) {
      const type = types[random.integer(0, types.length - 1)];
      if (type !== undefined) {
        problems.push(_createProblem(type));
      }
    }
    setItem("problems", JSON.stringify(problems));
    return problems;
  };

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
