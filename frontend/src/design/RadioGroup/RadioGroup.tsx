import React from "react";
import {RadioGroup as NextRadioGroup} from "@nextui-org/react";
import Text from "../Text/Text";

export type RadioGroupProps = React.ComponentProps<typeof NextRadioGroup> & {
    label?: string;
}

const RadioGroup: React.FC<RadioGroupProps> = ({label, children, ...props}) => (
    <NextRadioGroup label={<Text textSize='body'>{label}</Text>} {...props}>
        {children}
    </NextRadioGroup>
);

export default RadioGroup;