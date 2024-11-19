import type { Meta, StoryObj } from '@storybook/react';
import Card from './Card';
import { ClockIcon } from '@heroicons/react/24/outline'

export default {
  title: 'Components/Card',
};

const CardDemo = () => {
  return (
    <div className='bg-grey-bg p-3'>
        <div className='grid gap-4 grid-cols-3'>
            <Card icon={<ClockIcon className="size-9 text-primary"/>} description='Lorem ipsum dolor sit amet, consectetur adipiscing elit.'>Time-dependent parameter</Card>
        </div>
    </div>
  );
};

export const Variants = CardDemo.bind({});