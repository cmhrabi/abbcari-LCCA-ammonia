import React from "react";
import Text from "../Text/Text";
import { cva } from "class-variance-authority";

interface CardProps {
  description?: string;
  children: string;
  icon?: React.ReactNode;
  variant?: "home" | "primary";
}

const Card: React.FC<CardProps> = ({
  description,
  children,
  icon,
  variant = "home",
}) => {
  const variants = cva("shadow-card rounded-5px bg-white", {
    variants: {
      variant: {
        home: "",
        primary: "border border-primary cursor-pointer hover:border-2",
      },
    },
  });

  let component = <></>;
  if (variant == "home") {
    component = (
      <div className="py-9 px-8">
        <div className="flex flex-row items-center gap-x-4 pb-5">
          {icon}
          <Text textSize="sub3">{children}</Text>
        </div>
        {description && <Text textSize="body">{description}</Text>}
      </div>
    );
  }

  if (variant == "primary") {
    component = (
      <div className="py-12 px-8">
        <div className="flex flex-col justify-center justify-items-center pb-3.5">
          {icon && (
            <div className="pb-6 flex justify-center justify-items-center">
              {icon}
            </div>
          )}
          <Text textSize="sub2" align="center">
            {children}
          </Text>
        </div>
        {description && (
          <Text textSize="body" align="center">
            {description}
          </Text>
        )}
      </div>
    );
  }

  return <div className={variants({ variant: variant })}>{component}</div>;
};

export default Card;
