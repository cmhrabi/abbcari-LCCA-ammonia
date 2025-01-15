import React from "react";
import Text from "./Text";

export default {
  title: "Design/Typography",
};

const TypographyDemo = () => {
  return (
    <div className="grid gap-4 grid-cols-1">
      <Text textSize="h1">Heading 1</Text>
      <Text textSize="h2">Heading 2</Text>
      <Text textSize="sub1">Subtitle 1</Text>
      <Text textSize="sub2">Subtitle 2</Text>
      <Text textSize="body">Body text</Text>
      <Text textSize="button-sm">Button small text</Text>
      <Text textSize="button-md">Button med text</Text>
      <Text textSize="button-lg">Button large text</Text>
      <Text textSize="label">Label</Text>
      <Text textSize="input">Input text</Text>
    </div>
  );
};

export const Variants = TypographyDemo.bind({});
