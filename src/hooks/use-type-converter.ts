import { ProblemType } from "@/interfaces";
import {
  faArrowsRotate,
  faDivide, faFloppyDisk, faLightbulb,
  faMinus,
  faPlus,
  faPrint,
  faSliders,
  faXmark,
  IconDefinition,
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
      case Icons.SETTINGS:
        return faSliders;
      case Icons.RELOAD:
        return faArrowsRotate;
      case Icons.IDEA:
        return faLightbulb;
      case Icons.SAVE:
        return faFloppyDisk;
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
      case "ADDITION":
        return ProblemType.ADDITION;
      case "SUBTRACTION":
        return ProblemType.SUBTRACTION;
      case "MULTIPLICATION":
        return ProblemType.MULTIPLICATION;
      case "DIVISION":
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
