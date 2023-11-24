import './Button.js';
import type { IvyIconProps } from '../IvyIcon.js';
import IvyIcon from '../IvyIcon.js';
import type { ComponentProps} from 'react';
import { forwardRef } from 'react';

export type ButtonProps = ComponentProps<'button'> & Partial<IvyIconProps>;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ children, className, icon, rotate, ...props }, forwardedRef) => (
  <button {...props} ref={forwardedRef} className={`button ${className ?? ''}`}>
    {icon && <IvyIcon icon={icon} rotate={rotate} />}
    {children}
  </button>
));

export default Button;
