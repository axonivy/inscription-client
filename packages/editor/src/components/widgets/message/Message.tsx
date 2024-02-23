import './Message.css';
import type { InscriptionValidation, Severity } from '@axonivy/inscription-protocol';
import IvyIcon from '../IvyIcon';
import type { ReactNode } from 'react';
import { IvyIcons } from '@axonivy/ui-icons';

export type Message = Omit<InscriptionValidation, 'path'>;

export type MessageTextProps = {
  message?: Omit<InscriptionValidation, 'path'>;
  children?: ReactNode;
};

const ivyIconForSeverity = (severity: Severity) => {
  switch (severity) {
    case 'INFO':
      return IvyIcons.InfoCircle;
    case 'WARNING':
      return IvyIcons.Caution;
    case 'ERROR':
      return IvyIcons.ErrorXMark;
  }
};

export const MessageText = ({ message, children }: MessageTextProps) => {
  if (message) {
    return (
      <div className='message' data-state={message.severity.toString().toLowerCase()} title={message.message}>
        <IvyIcon icon={ivyIconForSeverity(message.severity)} />
        <span>{message.message}</span>
        {children}
      </div>
    );
  }
  return null;
};
