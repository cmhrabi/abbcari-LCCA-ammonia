import React from 'react';
import { cva } from 'class-variance-authority';
import Text from '../Text/Text';
import Button from '../Button/Button';
import infoIcon from '../../assets/alert_icons/info.svg';
import dangerIcon from '../../assets/alert_icons/danger.svg';
import successIcon from '../../assets/alert_icons/success.svg';
import warningIcon from '../../assets/alert_icons/warning.svg';


const alertStyles = cva(
  "p-4 mb-4 rounded-3px shadow-md ",
  {
    variants: {
      type: {
        info: "bg-tertiary-bg border-l-3 border-t-1 border-r-1 border-b-1 border-l-tertiary border-primary-alert-border", //custom border color not added in theme
        success: "bg-success-bg text-success border-l-4 border-success",
        warning: "bg-warning-bg text-warning border-l-4 border-warning",
        danger: "bg-danger-bg text-danger border-l-4 border-danger",
      },
      layout: { default: "flex items-start space-x-2", inline: "flex space-x-2" },
    },
    defaultVariants: {
      type: "info",
      layout: "default",
    },
  }
);

const infoMessageVariants = cva("",
  {
    variants: {
      layout: {
        default: "space-y-4",
        inline: "flex w-full justify-between items-center",
      },
      defaultVariants: {
        layout: "default",
      }
    },
  }
)

const buttonColors = {
    info: 'tertiary' as const,
    success: 'success' as const,
    warning: 'warning' as const,
    danger: 'danger' as const,
}

const iconMap = {
    info: infoIcon,
    success: successIcon,
    warning: warningIcon,
    danger: dangerIcon,
}

export interface AlertProps {
    type?: 'info' | 'success' | 'warning' | 'danger',
    layout?: 'default' | 'inline',
    title: React.ReactNode,
    message?: React.ReactNode,
    actionLabel?: string,
    action?: () => void,
    secondaryLabel?: string,
    secondaryAction?: () => void
  };

const Alert: React.FC<AlertProps> = ({ type = 'info', layout ='default', title, message, action, actionLabel, secondaryLabel, secondaryAction }) => (
  <div className={alertStyles({ type, layout })}>
      <img src={iconMap[type]} className='inline' alt={type}/>
      <div className={infoMessageVariants({layout})}>
        <div className="flex flex-col"> 
          <div>
            <Text textSize='alert-title'>{title}</Text>
          </div>
          {title && <Text textSize='body'>{message}</Text>}
        </div>
        <div className='space-x-2'>
            {action && actionLabel && <Button color={buttonColors[type]} size='small' onClick={action}>{actionLabel}</Button>}
            {secondaryAction && secondaryLabel && <Button color={buttonColors[type]} secondary size='small' onClick={secondaryAction}><Text textSize='button-sm' color={buttonColors[type]}>{secondaryLabel}</Text></Button>}
        </div>
    </div>
  </div>
);

// Export the Alert component
export default Alert;