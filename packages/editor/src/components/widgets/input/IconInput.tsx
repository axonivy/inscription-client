import './Input.css';
import { IvyIcons } from '@axonivy/editor-icons';
import IvyIcon from '../IvyIcon';
import Input, { InputProps } from './Input';

export type IconInputProps = InputProps & {
  icon: IvyIcons;
};

const IconInput = (props: IconInputProps) => {
  return (
    <div className='icon-input'>
      <IvyIcon icon={props.icon} />
      <Input {...props} />
    </div>
  );
};

export default IconInput;
