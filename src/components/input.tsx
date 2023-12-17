import { InputHTMLAttributes } from "react";
import classNames from "classnames";
import s from "@/styles/input.module.scss";
export interface IInput extends InputHTMLAttributes<HTMLInputElement> {}
const Input = (p: IInput) => {
  const { className, ...props } = p;
  return <input {...props} className={classNames(className, s.input)} />;
};
export default Input;
