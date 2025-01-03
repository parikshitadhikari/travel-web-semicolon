import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className: string;
}

/**
 * @function Button
 * @description A reusable button component that accepts children and custom class names.
 * @param {Props} { children, className } - Props containing children (ReactNode) and className (string).
 * @returns {JTX.Element} - A button element with custom content and styling.
 */
const Button = ({ children, className }: Props) => {
  return (
    <button type="button" className={className}>
      {children}
    </button>
  );
};

export default Button;
