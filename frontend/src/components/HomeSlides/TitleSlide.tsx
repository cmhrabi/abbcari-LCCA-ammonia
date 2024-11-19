import React from 'react';
import Button from '../../design/Button/Button';
import Text from '../../design/Text/Text';
import { useNavigate } from 'react-router-dom';

interface TitleSlideProps {
}

const TitleSlide: React.FC<TitleSlideProps> = ({}) => {
    const navigate = useNavigate();

    return (
        <div>
            <div className='py-32 max-w-6xl m-auto'>
                <div className='w-5/12'>
                    <div className='pb-9 grid gap-y-4 grid-cols-1'>
                        <Text textSize='sub1' color='primary'>Welcome to the</Text>
                        <Text textSize='h1' color='secondary'>Levelized Cost of Carbon Abatement (LCCA) Model</Text>
                    </div>
                    <Button size='large' onClick={() => navigate('/analysis')}>Get Started</Button>
                </div>
            </div>
        </div>
    );
};

export default TitleSlide;