import './MessageRow.css';
import type { ComponentProps } from 'react';
import { forwardRef } from 'react';
import type { MessageTextProps } from '../../message/Message';
import { MessageText } from '../../message/Message';

export type MessageRowProps = MessageTextProps & ComponentProps<'tr'> & { colSpan: number };

export const MessageRow = forwardRef<HTMLTableRowElement, MessageRowProps>(
  ({ message, children, className, colSpan, ...props }, forwardRef) => {
    return (
      <>
        <tr ref={forwardRef} className={`row ${message ? `row-${message.severity.toLocaleLowerCase()}` : ''} ${className}`} {...props}>
          {children}
        </tr>
        {message && (
          <tr className='row row-message'>
            <td colSpan={colSpan}>
              <MessageText message={message} />
            </td>
          </tr>
        )}
      </>
    );
  }
);
