import { ButtonHTMLAttributes } from "react";
import s from "@/styles/normalbutton.module.scss";
import classNames from "classnames";

export interface INormalButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: "primary" | "secondary";
  chalk?: boolean;
  leveled?: boolean;
}

const NormalButton = (props: INormalButton) => {
  let { className, color, leveled, chalk, children, ...otherProps } = props;
  return (
    <button
      {...otherProps}
      className={classNames(
        className,
        s.button,
        chalk ? s.chalk : null,
        leveled ? s.leveled : null,
        color === "primary" ? s.primary : s.secondary,
      )}
    >
      {children}
    </button>
  );
};
export default NormalButton;
