import type { Meta, StoryObj } from '@storybook/react';
import Input from './Input';

export default {
  title: 'Components/Input',
};

const InputDemo = () => {
  return (
    <div className="grid grid-cols-3 gap-4 items-end">
        <Input placeholder='Placeholer'/>
        <Input placeholder='Placeholer' label='Field Label' helpMessage="Help Message"/>
        <Input placeholder='Placeholer' label='Field Label' disabled/>
        <Input placeholder='Placeholer' error='Error Message' />
        <Input placeholder='Placeholer' label='Field Label' error='Error Message' helpMessage="Help Message"/>
        <Input placeholder='Placeholer' label='Field Label' error='Error Message' disabled/>
    </div>
  );
};

export const Variants = InputDemo.bind({});