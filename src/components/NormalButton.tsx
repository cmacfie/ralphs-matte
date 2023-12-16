import { ButtonHTMLAttributes } from "react";
import s from "@/styles/normalbutton.module.scss";
import classNames from "classnames";

const NormalButton = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
  let { className, children, ...otherProps } = props;
  return (
    <button {...otherProps} className={classNames(className, s.button)}>
      {children}
    </button>
  );
};
export default NormalButton;
