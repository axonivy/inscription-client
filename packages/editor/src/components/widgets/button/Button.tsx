import './Button.css';
import { IvyIcons } from '@axonivy/editor-icons';
import IvyIcon from '../IvyIcon';
import { ComponentProps } from 'react';
import React from 'react';

export type ButtonProps = ComponentProps<'button'> & {
  icon: IvyIcons;
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ children, className, icon, ...props }, forwardedRef) => (
  <button {...props} ref={forwardedRef} className={`button ${className ?? ''}`}>
    <IvyIcon icon={icon} />
    {children}
  </button>
));

export default Button;
