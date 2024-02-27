import './MessageRow.css';
import type { InscriptionValidation, Severity } from '@axonivy/inscription-protocol';
import { Message } from '@axonivy/ui-components';
import type { ValidationMessage } from '../../message/Message';

export type MessageRowProps = { message?: ValidationMessage; colSpan?: number };

export const styleMessageRow = (message?: Omit<InscriptionValidation, 'path'>, className?: string) => {
  return `row ${message ? `row-${message.severity.toLocaleLowerCase()}` : ''} ${className}`;
};

export const MessageRow = ({ message, colSpan }: MessageRowProps) => {
  return (
    <>
      {message && (
        <tr className={`row row-message message-${message.severity.toLocaleLowerCase()}`}>
          <td colSpan={colSpan ?? 2}>
            <Message message={message.message} variant={message.severity.toLocaleLowerCase() as Lowercase<Severity>} />
          </td>
        </tr>
      )}
    </>
  );
};
