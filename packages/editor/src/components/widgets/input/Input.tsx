import './Input.css';
import { IvyIcons } from '@axonivy/editor-icons';
import IvyIcon from '../IvyIcon';

const Input = (props: { value: string; onChange: (value: string) => void; icon?: IvyIcons; placeholder?: string }) => {
  return (
    <>
      {props.icon ? (
        <div className='icon-input'>
          <IvyIcon icon={props.icon} />
          <input className='input' value={props.value} onChange={e => props.onChange(e.target.value)} placeholder={props.placeholder} />
        </div>
      ) : (
        <input className='input' value={props.value} onChange={e => props.onChange(e.target.value)} placeholder={props.placeholder} />
      )}
    </>
  );
};

export default Input;
