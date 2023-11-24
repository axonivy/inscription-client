import './MessageRow.js';
import type { ComponentProps} from 'react';
import { forwardRef } from 'react';
import type { MessageTextProps } from '../../message/Message.js';
import { MessageText } from '../../message/Message.js';

export type MessageRowProps = MessageTextProps & ComponentProps<'tr'>;

export const MessageRow = forwardRef<HTMLTableRowElement, MessageRowProps>(({ message, children, className, ...props }, forwardRef) => {
  return (
    <>
      <tr ref={forwardRef} className={`row ${message ? `row-${message.severity.toLocaleLowerCase()}` : ''} ${className}`} {...props}>
        {children}
      </tr>
      {message && (
        <tr className='row row-message'>
          <td colSpan={100}>
            <MessageText message={message} />
          </td>
        </tr>
      )}
    </>
  );
});
