import PrintComponent from "@/components/PrintComponent";
import useMathGenerator from "@/hooks/use-math-generator";
import { useEffect, useState } from "react";
import { IMathProblem, ProblemType } from "@/interfaces";
import PrintLayout from "@/layouts/print-layout";

const PrintPage = () => {
  const [problems, setProblems] = useState<IMathProblem[]>([]);
  const { generateArray, getSavedProblems } = useMathGenerator({
    additionRange: { min: 1, max: 50 },
    multiplicationRange: { min: 1, max: 10 },
    numberOfProblems: 20,
  });

  useEffect(() => {
    const newProblems = generateArray(
      [ProblemType.ADDITION, ProblemType.MULTIPLICATION],
      100,
    );
    setProblems(newProblems);
  }, []);

  return (
    <PrintLayout>
      <PrintComponent problems={problems} />
    </PrintLayout>
  );
};
export default PrintPage;
