import { ProblemType } from "@/interfaces";
import {
  faDivide,
  faMinus,
  faPlus,
  faPrint,
  faXmark,
  IconDefinition,
  IconName,
} from "@fortawesome/free-solid-svg-icons";
import { Icons } from "@/components/Icon";
import { ToggledMathTypes } from "@/components/MathButtons";

const useTypeConverter = () => {
  const IconToDefinition = (icon: Icons): IconDefinition => {
    switch (icon) {
      case Icons.SUBTRACTION:
        return faMinus;
      case Icons.MULTIPLICATION:
        return faXmark;
      case Icons.DIVISION:
        return faDivide;
      case Icons.PRINT:
        return faPrint;
      case Icons.ADDITION:
        return faPlus;
    }
  };

  const MathProblemsToParams = (problems: ToggledMathTypes) => {
    return [
      problems.ADDITION ? "a" : null,
      problems.SUBTRACTION ? "s" : null,
      problems.MULTIPLICATION ? "m" : null,
      problems.DIVISION ? "d" : null,
    ]
      .filter((s) => s != null)
      .join(";");
  };
  const ParamsToMathProblems = (params: string[]): ToggledMathTypes => {
    return {
      [ProblemType.ADDITION]: params.includes("a"),
      [ProblemType.SUBTRACTION]: params.includes("s"),
      [ProblemType.MULTIPLICATION]: params.includes("m"),
      [ProblemType.DIVISION]: params.includes("d"),
    };
  };

  const MathProblemTypeToString = (p: ProblemType) => {
    switch (p) {
      case ProblemType.ADDITION:
        return "addition";
      case ProblemType.SUBTRACTION:
        return "subtraction";
      case ProblemType.MULTIPLICATION:
        return "multiplication";
      case ProblemType.DIVISION:
        return "division";
    }
  };
  const StringToMathProblemType = (s: string) => {
    switch (s) {
      case "addition":
      case "a":
        return ProblemType.ADDITION;
      case "subtraction":
      case "s":
        return ProblemType.SUBTRACTION;
      case "mutliplication":
      case "m":
        return ProblemType.MULTIPLICATION;
      case "division":
      case "d":
        return ProblemType.DIVISION;
    }
  };
  return {
    MathProblemTypeToString,
    StringToMathProblemType,
    IconToIconName: IconToDefinition,
    MathProblemsToParams,
    ParamsToMathProblems,
  };
};
export default useTypeConverter;
