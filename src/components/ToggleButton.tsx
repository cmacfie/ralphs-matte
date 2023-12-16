import React, { ReactNode, useMemo, useState } from "react";
import classNames from "classnames";
import s from "@/styles/togglebutton.module.scss";
import { ProblemType } from "@/interfaces";
import useTypeConverter from "@/hooks/use-type-converter";
import Icon from "@/components/Icon";

const ToggleButton = ({
  type,
  onToggle,
  toggled,
  icon,
}: {
  type: ProblemType;
  onToggle: (type: ProblemType) => void;
  toggled: boolean;
  icon: ReactNode;
}) => {
  const onClick = () => {
    onToggle(type);
  };

  return (
    <div
      onClick={onClick}
      className={classNames(s.toggleButton, toggled ? s.toggled : null)}
    >
      {icon}
    </div>
  );
};
export default ToggleButton;
