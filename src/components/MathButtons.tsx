import ToggleButton from "@/components/ToggleButton";
import React, { useEffect, useMemo, useState } from "react";
import { ProblemType } from "@/interfaces";
import Icon, { Icons } from "@/components/Icon";
import classNames from "classnames";
import s from "@/styles/mathbuttons.module.scss";

export type ToggledMathTypes = { [key in ProblemType]: boolean };

const MathButtons = ({
  onChange,
}: {
  onChange: (newTypes: ProblemType[]) => void;
}) => {
  const [toggled, setToggled] = useState<ProblemType[]>([ProblemType.ADDITION]);

  const toggledAsMap: ToggledMathTypes = useMemo(() => {
    return {
      ADDITION: toggled.includes(ProblemType.ADDITION),
      SUBTRACTION: toggled.includes(ProblemType.SUBTRACTION),
      MULTIPLICATION: toggled.includes(ProblemType.MULTIPLICATION),
      DIVISION: toggled.includes(ProblemType.DIVISION),
    };
  }, [toggled]);

  const onToggle = (type: ProblemType) => {
    setToggled((old) => {
        if(old.includes(type)) {
            return old.filter(f => type !== f);
        }
        return [...old, type];
    });
  };

  useEffect(() => {
    onChange(toggled);
  }, [toggled]);

  return (
    <div className={classNames(s.mathButtons)}>
      <ToggleButton
        toggled={toggledAsMap.ADDITION}
        type={ProblemType.ADDITION}
        onToggle={onToggle}
        icon={<Icon icon={Icons.ADDITION} />}
      />
      <ToggleButton
        toggled={toggledAsMap.SUBTRACTION}
        type={ProblemType.SUBTRACTION}
        onToggle={onToggle}
        icon={<Icon icon={Icons.SUBTRACTION} />}
      />
      <ToggleButton
        toggled={toggledAsMap.MULTIPLICATION}
        type={ProblemType.MULTIPLICATION}
        onToggle={onToggle}
        icon={<Icon icon={Icons.MULTIPLICATION} />}
      />
      <ToggleButton
        toggled={toggledAsMap.DIVISION}
        type={ProblemType.DIVISION}
        onToggle={onToggle}
        icon={<Icon icon={Icons.DIVISION} />}
      />
    </div>
  );
};
export default MathButtons;
