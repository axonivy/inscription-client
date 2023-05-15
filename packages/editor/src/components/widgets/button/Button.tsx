import './Button.css';
import { IvyIcons } from '@axonivy/editor-icons';
import IvyIcon from '../IvyIcon';
import { ComponentProps } from 'react';

export type ButtonProps = ComponentProps<'button'> & {
  icon: IvyIcons;
};

const Button = (props: ButtonProps) => (
  <button {...props} className={`button ${props.className ?? ''}`}>
    <IvyIcon icon={props.icon} />
    {props.children}
  </button>
);

export default Button;
