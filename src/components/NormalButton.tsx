import { ButtonHTMLAttributes } from "react";
import s from "@/styles/normalbutton.module.scss";
import classNames from "classnames";

export interface INormalButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: "primary" | "secondary";
}

const NormalButton = (props: INormalButton) => {
  let { className, color, children, ...otherProps } = props;
  return (
    <button
      {...otherProps}
      className={classNames(
        className,
        s.button,
        color === "primary" ? s.primary : s.secondary,
      )}
    >
      {children}
    </button>
  );
};
export default NormalButton;
