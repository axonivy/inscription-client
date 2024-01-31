import './MessageRow.css';
import type { ComponentProps } from 'react';
import { forwardRef } from 'react';
import type { MessageTextProps } from '../../message/Message';
import { MessageText } from '../../message/Message';
import type { InscriptionValidation } from '@axonivy/inscription-protocol';

export type MessageRowProps = MessageTextProps & ComponentProps<'tr'> & { colSpan: number };

export const MessageRowWithTr = forwardRef<HTMLTableRowElement, MessageRowProps>(
  ({ message, children, className, colSpan, ...props }, forwardRef) => {
    return (
      <>
        <tr ref={forwardRef} className={styleMessageRow(message, className)} {...props}>
          {children}
        </tr>
        <MessageRow message={message} colSpan={colSpan} />
      </>
    );
  }
);

export const styleMessageRow = (message?: Omit<InscriptionValidation, 'path'>, className?: string) => {
  return `row ${message ? `row-${message.severity.toLocaleLowerCase()}` : ''} ${className}`;
};

export const MessageRow = (props: { message?: Omit<InscriptionValidation, 'path'>; colSpan?: number }) => {
  return (
    <>
      {props.message && (
        <tr className='row row-message'>
          <td colSpan={props.colSpan ?? 2}>
            <MessageText message={props.message} />
          </td>
        </tr>
      )}
    </>
  );
};
