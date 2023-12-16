import ToggleButton from "@/components/ToggleButton";
import React, { useEffect, useState } from "react";
import { ProblemType } from "@/interfaces";
import Icon, { Icons } from "@/components/Icon";
import classNames from "classnames";
import s from "@/styles/mathbuttons.module.scss";
import useTypeConverter from "@/hooks/use-type-converter";
import { useRouter } from "next/router";

export type ToggledMathTypes = { [key in ProblemType]: boolean };

const MathButtons = () => {
  const { MathProblemsToParams, ParamsToMathProblems } = useTypeConverter();
  const router = useRouter();
  const [toggled, setToggled] = useState<ToggledMathTypes>({
    [ProblemType.ADDITION]: true,
    [ProblemType.SUBTRACTION]: false,
    [ProblemType.MULTIPLICATION]: false,
    [ProblemType.DIVISION]: false,
  });

  useEffect(() => {
    const queries = router.query.t ?? [];
    if (typeof queries !== "string") {
      return;
    }
    const newModel = ParamsToMathProblems(queries.split(";"));
    setToggled(newModel);
  }, []);

  const onToggle = (type: ProblemType) => {
    setToggled((old) => ({
      ...old,
      [type]: !old[type],
    }));
  };
  useEffect(() => {
    router.query.t = MathProblemsToParams(toggled);
    router.push(router);
  }, [toggled]);

  return (
    <div className={classNames(s.mathButtons)}>
      <ToggleButton
        toggled={toggled.ADDITION}
        type={ProblemType.ADDITION}
        onToggle={onToggle}
        icon={<Icon icon={Icons.ADDITION} />}
      />
      <ToggleButton
        toggled={toggled.SUBTRACTION}
        type={ProblemType.SUBTRACTION}
        onToggle={onToggle}
        icon={<Icon icon={Icons.SUBTRACTION} />}
      />
      <ToggleButton
        toggled={toggled.MULTIPLICATION}
        type={ProblemType.MULTIPLICATION}
        onToggle={onToggle}
        icon={<Icon icon={Icons.MULTIPLICATION} />}
      />
      <ToggleButton
        toggled={toggled.DIVISION}
        type={ProblemType.DIVISION}
        onToggle={onToggle}
        icon={<Icon icon={Icons.DIVISION} />}
      />
    </div>
  );
};
export default MathButtons;
