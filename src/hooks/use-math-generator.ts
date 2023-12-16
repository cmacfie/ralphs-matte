import random from "random";
import { IMathProblem, MinMax, ProblemType } from "@/interfaces";
import useTypeConverter from "@/hooks/use-type-converter";

const useMathGenerator = (
  additionRange: MinMax,
  multiplicationRange: MinMax,
) => {
  const { StringToMathProblemType } = useTypeConverter();

  const toProblemTypes = (problems: string[]) => {
    return problems.map((s) => StringToMathProblemType(s));
  };

  const getNumberInRange = (type: ProblemType) => {
    const minMax =
      type === ProblemType.ADDITION ? additionRange : multiplicationRange;
    return random.int(minMax.min, minMax.max);
  };

  const _createProblem = (type: ProblemType): IMathProblem => {
    if (type === ProblemType.DIVISION) {
      const divisionNumber = getNumberInRange(type);
      const smallNumber = random.int(2, 3);
      return {
        number1: divisionNumber * smallNumber,
        number2: smallNumber,
        type: ProblemType.DIVISION,
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
    return {
      number1,
      number2,
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
    return problems;
  };

  return {
    generateArray,
    toProblemTypes,
  };
};

export default useMathGenerator;
