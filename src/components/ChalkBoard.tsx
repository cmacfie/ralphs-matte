import React, { Component, HTMLProps } from "react";
import s from "@/styles/chalkboard.module.scss";
import classNames from "classnames";

const ChalkBoard = ({
  children,
  className,
  ...props
}: HTMLProps<HTMLDivElement>) => {
  return (
    <div className={classNames(s.chalkBoard, className)} {...props}>
      {children}
    </div>
  );
};
export default ChalkBoard;
