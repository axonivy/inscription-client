import './MessageRow.css';
import { ReactNode } from 'react';
import { MessageText, MessageTextProps } from '../../message/Message';

export type MessageRowProps = MessageTextProps & {
  children: ReactNode;
};

export const MessageRow = ({ message, children }: MessageRowProps) => {
  return (
    <>
      <tr className={`row ${message ? `row-${message.severity.toLocaleLowerCase()}` : ''}`}>{children}</tr>
      {message && (
        <tr className='row row-message'>
          <td colSpan={100}>
            <MessageText message={message} />
          </td>
        </tr>
      )}
    </>
  );
};
