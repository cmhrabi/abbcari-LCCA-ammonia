import React from 'react';
import Text from '../Text/Text';
import { cva } from 'class-variance-authority';

interface CardProps {
    description?: string;
    children: string;
    icon?: React.ReactNode;
    variant?: 'home';
}

const Card: React.FC<CardProps> = ({ description, children, icon, variant = 'home' }) => {
    const variants = cva([], {
        variants : {
            variant: {
                home: 'shadow-card rounded-5px bg-white',
            },
        },
    });

    return (
        <div className={variants({variant: variant})}>
            <div className='py-9 px-8'>
                <div className='flex flex-row items-center gap-x-4 pb-5'>
                    {icon}
                    <Text textSize='sub3'>{children}</Text>
                </div>
                {description && <Text textSize='body'>{description}</Text>}
            </div>
        </div>
    );
};

export default Card;