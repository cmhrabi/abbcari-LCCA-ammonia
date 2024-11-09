import React, { useRef, useState } from 'react';
import { cva } from 'class-variance-authority';
import HelpMessage from '../HelpMessage/HelpMessage';
import HelpIcon from '../../../public/help_icons/help.svg'
import ErrorIcon from '../../../public/help_icons/error.svg'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    helpMessage?: string;
    error?: string;
}

const Input: React.FC<InputProps> = ({ label, helpMessage, error, ...props }) => {
    const inputVariants = cva(
        'block w-full p-3 border placeholder:text-input placeholder:text-grey-blue disabled:bg-grey rounded-3px shadow-sm ',
        {
            variants: {
                focus: {
                    error: 'outline-none border-danger shadow-input',
                    noError: 'focus:outline-none focus:border-tertiary focus:shadow-input'
                }
            }
        }
    );
    const labelVariants = cva('block text-input', );

    const [focused, setFocused] = React.useState(false)
    const onFocus = () => setFocused(true)
    const onBlur = () => setFocused(false)
    const handleSnoozeHelp = () => setFocused(false)

    return (
        <div>
            {helpMessage && focused && !error && <HelpMessage onSnooze={handleSnoozeHelp} type='info'>{helpMessage}</HelpMessage>}
            {error && <HelpMessage type='error' onSnooze={handleSnoozeHelp}>{error}</HelpMessage>}
            <div className="flex flex-row space-x-1">
                {label && !error && <img onClick={onFocus} src={HelpIcon} width={16} height={16}/>}
                {label && error && <img onClick={onFocus} src={ErrorIcon} width={16} height={16}/>}
                {label && <label className={labelVariants({})}>{label}</label>}
            </div>
            <input className={inputVariants({focus: error ? 'error' : 'noError'})} onFocus={onFocus} onBlur={onBlur} {...props}/>
        </div>
    );
};

export default Input;