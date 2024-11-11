import type { Meta, StoryObj } from '@storybook/react';
import Alert from './Alert';

export default {
  title: 'Components/Alert',
};

const AlertDemo = () => {
  return (
    <div className="grid grid-cols-2 gap-4 items-end">
        <Alert type='info' title="Informational message" message="The main description message of this Alert component should be placed here." action={() => {}} actionLabel='Primary' secondaryAction={() => {}} secondaryLabel='Secondary'/>
        <Alert layout='inline' type='info' title="Informational message" action={() => {}} actionLabel='Primary'/>
        <Alert type='success' title="Informational message" message="The main description message of this Alert component should be placed here." action={() => {}} actionLabel='Primary' secondaryAction={() => {}} secondaryLabel='Secondary'/>
        <Alert layout='inline' type='success' title="Informational message"  action={() => {}} actionLabel='Primary'/>
        <Alert type='warning' title="Informational message" message="The main description message of this Alert component should be placed here." action={() => {}} actionLabel='Primary' secondaryAction={() => {}} secondaryLabel='Secondary'/>
        <Alert layout='inline' type='warning' title="Informational message" action={() => {}} actionLabel='Primary'/>
        <Alert type='danger' title="Informational message" message="The main description message of this Alert component should be placed here." action={() => {}} actionLabel='Primary' secondaryAction={() => {}} secondaryLabel='Secondary'/>
        <Alert layout='inline' type='danger' title="Informational message" action={() => {}} actionLabel='Primary'/>
    </div>
  );
};

export const Variants = AlertDemo.bind({});