import HelpMessage from './HelpMessage';

export default {
  title: 'Components/HelpMessage',
};

const HelpMessageDemo = () => {
  return (
    <div>
        <HelpMessage type={'info'}>Help Message</HelpMessage>
    </div>
  );
};

export const Variants = HelpMessageDemo.bind({});