import React from 'react';
import { tv } from 'tailwind-variants';

interface TextProps {
    textSize?: 'h1' | 'h2' | 'sub1' | 'sub2' | 'body' | 'button' | 'label' | 'input';
    children: React.ReactNode;
}

const Text: React.FC<TextProps> = ({ textSize = 'body', children }) => {
    const variants = tv({
        variants: {
          size: {
            h1: 'text-h1',
            h2: 'text-h2',
            sub1: 'text-sub1 uppercase',
            sub2: 'text-sub2',
            body: 'text-body',
            button: 'text-button',
            label: 'text-label',
            input: 'text-input',
          }
        },
        defaultVariants: {
          size: 'body',
        }
      });

    return <div className={variants({size: textSize})}>{children}</div>;
};

export default Text;