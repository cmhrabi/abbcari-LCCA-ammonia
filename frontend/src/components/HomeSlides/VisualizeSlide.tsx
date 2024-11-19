import React from 'react';
import Text from '../../design/Text/Text';
import { ClockIcon, FlagIcon, PresentationChartLineIcon } from '@heroicons/react/24/outline';
import Card from '../../design/Card/Card';

interface VisualizeSlideProps {
}

const VisualizeSlide: React.FC<VisualizeSlideProps> = ({}) => {
    return (
        <div className='bg-grey-bg'>
            <div className='py-16 max-w-6xl m-auto'>
                <div className='grid grid-col-1 gap-y-4 pb-8'>
                    <Text textSize='sub1' color='primary'>explore possibilities</Text>
                    <Text textSize='h1' color='secondary'>Visualize strategies for sustainability</Text>
                </div>
                <div className='grid gap-12 grid-cols-3'>
                    <Card icon={<ClockIcon className="size-9 text-primary"/>} description='Lorem ipsum dolor sit amet, consectetur adipiscing elit.'>Time-dependent parameter</Card>
                    <Card icon={<FlagIcon className="size-9 text-primary"/>} description='Lorem ipsum dolor sit amet, consectetur adipiscing elit.'>Region-based analysis</Card>
                    <Card icon={<PresentationChartLineIcon className="size-9 text-primary"/>} description='Lorem ipsum dolor sit amet, consectetur adipiscing elit.'>Visualizations</Card>
                </div>
            </div>
        </div>
    );
};

export default VisualizeSlide;