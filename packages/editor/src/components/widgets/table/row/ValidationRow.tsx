import './ValidationRow.css';
import { ReactNode } from 'react';
import { Message } from '../../../props';

export const ValidationRow = ({ rowId, messages, children }: { rowId: string; messages: Message[]; children: ReactNode }) => {
  const message = messages.find(msg => msg.message.includes(`'${rowId}'`));
  return <tr className={`row ${message ? `row-${message.severity.toLocaleLowerCase()}` : ''}`}>{children}</tr>;
};
