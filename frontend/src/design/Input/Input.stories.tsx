import type { Meta, StoryObj } from '@storybook/react';
import Input from './Input';

export default {
  title: 'Components/Input',
};

const InputDemo = () => {
  return (
    <div className="grid grid-cols-3 gap-4 items-end">
        <Input />
        <Input label='Field Label'/>
        <Input label='Field Label' disabled/>
        <Input />
        <Input label='Field Label'/>
        <Input label='Field Label' disabled/>
        <Input />
        <Input label='Field Label'/>
        <Input label='Field Label' disabled/>
    </div>
  );
};

export const Variants = InputDemo.bind({});