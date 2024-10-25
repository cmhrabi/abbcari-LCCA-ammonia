import React from 'react';
import { cva } from 'class-variance-authority';
import HelpMessage from '../HelpMessage/HelpMessage';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

const Input: React.FC<InputProps> = ({ label, ...props }) => {
    const inputVariants = cva(
        'block w-full p-3 border placeholder:text-input placeholder:text-grey-blue disabled:bg-grey rounded-3px shadow-sm focus:outline-none focus:border-tertiary focus:shadow-input',
        // {
        //     variants: {
        //         size: {
        //             small: 'text-xs',
        //             medium: 'text-sm',
        //             large: 'text-lg',
        //         },
        //         variant: {
        //             primary: 'border-gray-300',
        //             secondary: 'border-red-300',
        //         },
        //     },
        //     defaultVariants: {
        //         size: 'medium',
        //         variant: 'primary',
        //     },
        // }
    );

    const labelVariants = cva('block text-input', );

    return (
        <div>
            <HelpMessage type='info'>This is a help message</HelpMessage>
            {label && <label className={labelVariants({})}>{label}</label>}
            <input className={inputVariants({})} {...props} placeholder='Placeholder'/>
        </div>
    );
};

export default Input;