import type { Meta, StoryObj } from '@storybook/react';
import NavBar from './NavBar';

export default {
  title: 'Components/NavBar',
};

const NavBarDemo = () => {
  return (
    <div className="grid grid-cols-1 gap-4 items-end">
        <NavBar title='LCCA' type='home'/>
        <NavBar title='LCCA'/>
    </div>
  );
};

export const Variants = NavBarDemo.bind({});