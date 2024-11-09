import React from 'react';
import { tv } from "@nextui-org/react";
import { cva } from 'class-variance-authority';

export interface TextProps extends React.HTMLAttributes<HTMLDivElement> {
    textSize?: TextSize;
    color?: 'black' | 'white' | 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger';
    children: React.ReactNode;
}

export type TextSize = 'h1' | 'h2' | 'sub1' | 'sub2' | 'body' | 'button-sm' | 'button-md' | 'button-lg' | 'label' | 'input' | 'help-message' | 'alert-title';

const Text: React.FC<TextProps> = ({ textSize = 'body', color = 'black', children, ...props }) => {
    const variants = cva([], {
        variants: {
          size: {
            h1: 'text-h1',
            h2: 'text-h2',
            sub1: 'text-sub1 uppercase',
            sub2: 'text-sub2',
            body: 'text-body',
            "button-sm": 'text-button-sm',
            "button-md": 'text-button-md',
            "button-lg": 'text-button-lg',
            label: 'text-label',
            input: 'text-input',
            "help-message": "text-help-message",
            "alert-title": "text-alert-title"
          },
          color: {
            black: 'text-black',
            white: 'text-white',
            primary: 'text-primary',
            secondary: 'text-secondary',
            tertiary: 'text-tertiary',
            success: 'text-success',
            warning: 'text-warning',
            danger: 'text-danger',
          },
        },
        defaultVariants: {
          size: 'body',
          color: 'black',
        }
      });

    return <div className={variants({size: textSize, color: color})} {...props}>{children}</div>;
};

export default Text;