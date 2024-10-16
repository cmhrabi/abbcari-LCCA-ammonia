import type { Meta, StoryObj } from '@storybook/react';
 
import LCCAButton from "./Button";
 
const meta: Meta<typeof LCCAButton> = {
  component: LCCAButton,
};
 
export default meta;
type Story = StoryObj<typeof LCCAButton>;
 
export const Primary: Story = {
  args: {
    primary: true,
    label: 'Button',
  },
};