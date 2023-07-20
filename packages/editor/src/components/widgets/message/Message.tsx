import './Message.css';
import { InscriptionValidation } from '@axonivy/inscription-protocol';
import IvyIcon from '../IvyIcon';

export type Message = Omit<InscriptionValidation, 'path'>;

export type MessageTextProps = {
  message?: Omit<InscriptionValidation, 'path'>;
};

export const MessageText = ({ message }: MessageTextProps) => {
  if (message) {
    return (
      <div className='message' data-state={message.severity.toString().toLowerCase()} title={message.message}>
        <IvyIcon icon={message.severity} />
        <span>{message.message}</span>
      </div>
    );
  }
  return null;
};
