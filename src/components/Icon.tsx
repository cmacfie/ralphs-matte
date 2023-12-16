import React, { ReactNode, useMemo } from "react";
import s from "@/styles/icon.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useTypeConverter from "@/hooks/use-type-converter";
export enum Icons {
  ADDITION = "ADDITION",
  SUBTRACTION = "SUBTRACTION",
  MULTIPLICATION = "MULTIPLICATION",
  DIVISION = "DIVISION",
  PRINT = "PRINT",
}
const Icon = ({ icon }: { icon: Icons }) => {
  const { IconToIconName } = useTypeConverter();
  const iconDef = IconToIconName(icon);

  return (
    <div className={s.icon}>
      <FontAwesomeIcon icon={iconDef} />
    </div>
  );
};
export default Icon;
