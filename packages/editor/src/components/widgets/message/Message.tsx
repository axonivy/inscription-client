import './Message.css';
import type { InscriptionValidation } from '@axonivy/inscription-protocol';
import IvyIcon from '../IvyIcon';
import type { ReactNode } from 'react';

export type Message = Omit<InscriptionValidation, 'path'>;

export type MessageTextProps = {
  message?: Omit<InscriptionValidation, 'path'>;
  children?: ReactNode;
};

export const MessageText = ({ message, children }: MessageTextProps) => {
  if (message) {
    return (
      <div className='message' data-state={message.severity.toString().toLowerCase()} title={message.message}>
        <IvyIcon icon={message.severity} />
        <span>{message.message}</span>
        {children}
      </div>
    );
  }
  return null;
};
