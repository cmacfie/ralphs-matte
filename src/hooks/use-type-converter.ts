import { ProblemType } from "@/interfaces";
import {
  faArrowsRotate,
  faDivide,
  faFloppyDisk,
  faLightbulb,
  faMinus,
  faPlus,
  faPrint,
  faSliders,
  faXmark,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { Icons } from "@/components/Icon";
import { ToggledMathTypes } from "@/components/MathButtons";
import { DIFFICULTY } from "@/hooks/use-settings";

const useTypeConverter = () => {
  const DifficultyToNumber = (difficulty: DIFFICULTY) => {
    switch (difficulty) {
      case DIFFICULTY.EASY:
        return 1;
      case DIFFICULTY.MEDIUM:
        return 2;
      case DIFFICULTY.HARD:
        return 3;
      case DIFFICULTY.VERY_HARD:
        return 4;
      case DIFFICULTY.MIXED:
        return 5;
    }
  };

  const DifficultyToString = (difficulty: string) => {
    switch (difficulty as DIFFICULTY) {
      case DIFFICULTY.EASY:
        return "LÄTTA";
      case DIFFICULTY.MEDIUM:
        return "MEDEL";
      case DIFFICULTY.HARD:
        return "SVÅRA";
      case DIFFICULTY.VERY_HARD:
        return "JÄTTESVÅRA";
      case DIFFICULTY.MIXED:
        return "BLANDADE";
    }
  };

  const MultiplicationValueToDifficulty = (n1: number, n2: number) => {
    if (n1 === 1 || n2 === 1) {
      return DIFFICULTY.EASY;
    }
    if (n1 < 3 || n2 < 3 || n1 === 10 || n2 === 10) {
      return DIFFICULTY.MEDIUM;
    }
    if (n1 < 5 || n2 < 5) {
      return DIFFICULTY.HARD;
    }
    return DIFFICULTY.VERY_HARD;
  };

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
    DifficultyToNumber,
    MultiplicationValueToDifficulty,
    DifficultyToString,
  };
};
export default useTypeConverter;
