import React from "react";
import { cn, Radio as NextRadio } from "@nextui-org/react";
import Text from "../Text/Text";

export type RadioProps = React.ComponentProps<typeof NextRadio> & {
  label: string;
  description?: string;
  value: string;
};

const Radio: React.FC<RadioProps> = ({
  label,
  description,
  value,
  ...props
}) => {
  return (
    <NextRadio
      classNames={{
        base: cn("flex items-start"),
        wrapper: cn(
          "bg-white border-1",
          "group-data-[selected=true]:bg-tertiary group-data-[selected=true]:border-tertiary",
        ),
        control: cn("group-data-[selected=true]:bg-white"),
      }}
      description={
        <Text textSize="label" color="grey-label">
          {description}
        </Text>
      }
      value={value}
      {...props}
    >
      <Text textSize="input">{label}</Text>
    </NextRadio>
  );
};

export default Radio;
