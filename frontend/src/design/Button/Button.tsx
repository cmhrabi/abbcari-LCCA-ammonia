import React from "react";
import Text, { TextSize } from "../Text/Text";
import { cva } from "class-variance-authority";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  start?: React.ReactNode;
  end?: React.ReactNode;
  children: React.ReactNode;
  color?:
    | "primary"
    | "secondary"
    | "tertiary"
    | "danger"
    | "warning"
    | "success"
    | "grey";
  size?: "small" | "medium" | "large";
  isIconOnly?: boolean;
  secondary?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  start,
  end,
  children,
  size = "medium",
  color = "primary",
  isIconOnly = false,
  secondary = false,
  ...props
}) => {
  const variants = cva(
    [
      "relative",
      "rounded-3px",
      "inline-flex",
      "items-center",
      "text-center",
      "disabled:bg-grey",
    ],
    {
      variants: {
        color: {
          primary: "bg-primary hover:bg-primary-hover",
          secondary: "bg-secondary",
          tertiary:
            "bg-tertiary hover:bg-tertiary-hover active:bg-tertiary-active",
          danger: "bg-danger hover:bg-danger-hover active:bg-danger-active",
          warning: "bg-warning hover:bg-warning-hover active:bg-warning-active",
          success: "bg-success hover:bg-success-hover active:bg-success-active",
          grey: "bg-grey-blue",
        },
        size: {
          small: "px-3 py-2",
          medium: "px-4 py-3",
          large: "px-6 py-3.5",
        },
        secondary: {
          true: "bg-opacity-30 hover:bg-opacity-40 active:bg-opacity-50",
        },
      },
    },
  );

  const startVariants = cva([], {
    variants: {
      size: {
        small: "pr-2",
        medium: "pr-2",
        large: "pr-3",
      },
    },
  });

  const endVariants = cva([], {
    variants: {
      size: {
        small: "pl-2",
        medium: "pl-2",
        large: "pl-3",
      },
    },
  });

  const textSizeMap: { [key: string]: TextSize } = {
    small: "button-sm",
    medium: "button-md",
    large: "button-lg",
  };

  return isIconOnly ? (
    <button
      {...props}
      className={variants({ size: size, color: color, secondary: secondary })}
    >
      {children}
    </button>
  ) : (
    <button
      {...props}
      className={variants({ size: size, color: color, secondary: secondary })}
    >
      {start && <div className={startVariants({ size: size })}>{start}</div>}
      <Text textSize={textSizeMap[size]} color="white">
        {children}
      </Text>
      {end && <div className={endVariants({ size: size })}>{end}</div>}
    </button>
  );
};

export default Button;
