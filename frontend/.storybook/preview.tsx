import type { Preview } from "@storybook/react";
import { HeroUIProvider } from "@heroui/react";
import React from "react";
import "./../src/index.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <HeroUIProvider>
        <Story />
      </HeroUIProvider>
    ),
  ],
};

export default preview;
