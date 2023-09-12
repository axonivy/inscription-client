import './Button.css';
import IvyIcon, { IvyIconProps } from '../IvyIcon';
import { ComponentProps, forwardRef } from 'react';

export type ButtonProps = ComponentProps<'button'> & IvyIconProps;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ children, className, icon, rotate, ...props }, forwardedRef) => (
  <button {...props} ref={forwardedRef} className={`button ${className ?? ''}`}>
    <IvyIcon icon={icon} rotate={rotate} />
    {children}
  </button>
));

export default Button;
