import React from 'react';
import { cva } from 'class-variance-authority';

export interface TextProps extends React.HTMLAttributes<HTMLDivElement> {
    textSize?: TextSize;
    color?: 'black' | 'white' | 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger' | 'grey-label';
    font?: 'default' | 'josefin';
    align?: 'left' | 'center' | 'right';
    children: React.ReactNode;
}

export type TextSize = 'h1' | 'h2' | 'sub1' | 'sub2' | 'sub3' | 'body' | 'button-sm' | 'button-md' | 'button-lg' | 'label' | 'input' | 'help-message' | 'alert-title' | 'nav-title';

const Text: React.FC<TextProps> = ({ textSize = 'body', color = 'black', children, align='left', font, ...props }) => {
    const variants = cva([], {
        variants: {
          size: {
            h1: 'text-h1',
            h2: 'text-h2',
            sub1: 'text-sub1 uppercase',
            sub2: 'text-sub2',
            sub3: 'text-sub3',
            body: 'text-body',
            "button-sm": 'text-button-sm',
            "button-md": 'text-button-md',
            "button-lg": 'text-button-lg',
            label: 'text-label',
            input: 'text-input',
            "help-message": "text-help-message",
            "alert-title": "text-alert-title",
            "nav-title": "text-nav-title"
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
            "grey-label": 'text-grey-label'
          },
          font: {
            default: 'font-sans',
            josefin: 'font-josefin'
          },
          align: {
            left: 'text-left',
            center: 'text-center',
            right: 'text-right'
          }
        },
        defaultVariants: {
          size: 'body',
          color: 'black',
          align: 'left',
        }
      });

    return <div className={variants({size: textSize, color: color, font: font, align: align})} {...props}>{children}</div>;
};

export default Text;