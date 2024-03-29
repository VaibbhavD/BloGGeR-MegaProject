import React from "react";

export default function Button({
  children,
  type = "button",
  bgColor,
  textColor,
  className,
  ...props
}) {
  return (
    <button
      className={`p-3 rounded-lg w-1/2 bg-orange-600 text-neutral-200  active:bg-neutral-200 active:text-orange-600 ${bgColor} ${textColor} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
