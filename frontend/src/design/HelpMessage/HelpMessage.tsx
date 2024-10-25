import React from 'react';
import { cva } from 'class-variance-authority';
import {semanticColors} from "@nextui-org/theme";
import Text from '../Text/Text';

interface HelpMessageProps {
    children: React.ReactNode;
    type: 'error' | 'warning' | 'info' | 'success';
}

const HelpMessage: React.FC<HelpMessageProps> = ({ children, type }) => {
    const variantsText = cva(['text-xs', 'text-gray-500', 'rounded-3px', 'py-2', 'px-3'], {
        variants : {
            type: {
                error: 'bg-danger',
                warning: 'bg-warning',
                info: 'bg-tertiary',
                success: 'bg-success',
            },
        },
    });

    return (
        <div className='w-1/2'>
            <div className={variantsText({type: type})}>
                <Text color='white' textSize='input'>{children}</Text>
            </div>
            <div className='pl-1'>
                <svg xmlns="http://www.w3.org/2000/svg" width="8" height="4" viewBox="0 0 8 4" fill="none">
                    <path d="M4.70711 3.29289C4.31658 3.68342 3.68342 3.68342 3.29289 3.29289L8.26528e-07 -4.60964e-07L8 2.38419e-07L4.70711 3.29289Z" fill='#0172CB'/>
                </svg>
            </div>
        </div>
    );
};

export default HelpMessage;