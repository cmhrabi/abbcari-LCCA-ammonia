import React from 'react';
import  {Button as NextButton}  from "@nextui-org/react" ;
import Text, { TextSize } from '../Text/Text';
import { cva } from 'class-variance-authority';

interface ButtonProps {
    start?: React.ReactNode;
    end?: React.ReactNode;
    children: React.ReactNode;
    color?: 'primary' | 'secondary';
    size?: 'small' | 'medium' | 'large';
    isIconOnly?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  start,
  end,
  children,
  size = 'medium',
  color = 'primary',
  isIconOnly = false,
}) => {
  const variants = cva(['relative', 'rounded-button', 'inline-flex', 'items-center', 'text-center'], {
    //Todo: Add more hover colors
    variants: {
      color: {
        primary: 'bg-primary hover:bg-primary-hover',
        secondary: 'bg-secondary',
        teritary: 'bg-teritary',
        danger: 'bg-danger',
        warning: 'bg-warning',
        success: 'bg-success',
      },
      size: {
        small: 'px-3 py-2',
        medium: 'px-4 py-3',
        large: 'px-6 py-3.5',
      },
    }
  });

  const startVariants = cva([], {
    variants: {
      size: {
        small: 'pr-2',
        medium: 'pr-2',
        large: 'pr-3',
      },
    }
  });
  
  const endVariants = cva([], {
    variants: {
      size: {
        small: 'pl-2',
        medium: 'pl-2',
        large: 'pl-3',
      },
    }
  });

  const textSizeMap: {[key: string]: TextSize} = {
    small: "button-sm",
    medium: "button-md",
    large: "button-lg",
  };

  return (
    isIconOnly ?
      <button className={variants({size: size, color: color})}>
        {children}
      </button>
     : 
      <button className={variants({size: size, color: color})}>
        {start && <div className={startVariants({size: size})}>{start}</div>}
        <Text textSize={textSizeMap[size]} color='white'>{children}</Text>
        {end && <div className={endVariants({size: size})}>{end}</div>}
      </button>
  );
}

export default Button;
