import React from 'react';

export default {
  title: 'Components/Colors',
};

const ColorDemo = () => {
  return (
    <div className="grid gap-4 grid-cols-2">
        <div className='bg-primary rounded-md p-2'>Primary</div>
        <div className='bg-secondary rounded-md p-2'>Secondary</div>
        <div className='bg-tertiary rounded-md p-2'>Tertiary</div>
        <div className='bg-grey rounded-md p-2'>Grey</div>
        <div className='bg-grey-dark rounded-md p-2'>Grey Dark</div>
        <div className='bg-grey-blue rounded-md p-2'>Grey Blue</div>
        <div className='bg-lightblue rounded-md p-2'>Light Blue</div>
        <div className='bg-success rounded-md p-2'>Success</div>
        <div className='bg-warning rounded-md p-2'>Warning</div>
        <div className='bg-danger rounded-md p-2'>Danger</div>
    </div>
  );
};

export const Pallete = ColorDemo.bind({});