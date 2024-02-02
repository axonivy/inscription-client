import './MessageRow.css';
import { MessageText } from '../../message/Message';
import type { InscriptionValidation } from '@axonivy/inscription-protocol';

export type MessageRowProps = { message?: Omit<InscriptionValidation, 'path'>; colSpan?: number };

export const styleMessageRow = (message?: Omit<InscriptionValidation, 'path'>, className?: string) => {
  return `row ${message ? `row-${message.severity.toLocaleLowerCase()}` : ''} ${className}`;
};

export const MessageRow = ({ message, colSpan }: MessageRowProps) => {
  return (
    <>
      {message && (
        <tr className={`row row-message message-${message.severity.toLocaleLowerCase()}`}>
          <td colSpan={colSpan ?? 2}>
            <MessageText message={message} />
          </td>
        </tr>
      )}
    </>
  );
};
