import './MessageRow.css';
import { ReactNode } from 'react';
import { MessageTextProps } from '../../message/Message';

export type MessageRowProps = MessageTextProps & {
  children: ReactNode;
};

export const MessageRow = ({ message, children }: MessageRowProps) => {
  return (
    <tr className={`row ${message ? `row-${message.severity.toLocaleLowerCase()}` : ''}`} title={message?.message}>
      {children}
    </tr>
  );
};
