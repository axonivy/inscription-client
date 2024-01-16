import type { ReactNode } from 'react';
import { mergePaths, usePath, useValidations } from '../../../../../context';
import type { ReorderRowProps, SelectRowProps } from '../../../../widgets';
import { MessageRow, MessageText, ReorderRow } from '../../../../widgets';

type ValidationRowProps = {
  rowPathSuffix: string | number;
  children: ReactNode;
  colSpan?: number;
  title?: string;
};

const useValidationRow = (rowPathSuffix: string | number) => {
  const validations = useValidations();
  const path = usePath();
  const rowPath = mergePaths(path, [rowPathSuffix]);
  return validations.find(val => val.path === rowPath);
};

export const ValidationRow = ({ rowPathSuffix, children, title, colSpan }: ValidationRowProps) => {
  const message = useValidationRow(rowPathSuffix);
  return (
    <MessageRow message={message} title={title} colSpan={colSpan ? colSpan : 2}>
      {children}
    </MessageRow>
  );
};

export const SelectableValidationRow = <TData extends object>({
  rowPathSuffix,
  children,
  title,
  row,
  colSpan,
  onDoubleClick
}: ValidationRowProps & SelectRowProps<TData>) => {
  const message = useValidationRow(rowPathSuffix);
  return (
    <>
      <tr
        className={`selectable-row ${message ? `row-${message.severity.toLocaleLowerCase()}` : ''}`}
        title={title}
        data-state={row.getIsSelected() ? 'selected' : ''}
        onClick={event => {
          if (event.detail === 1) {
            if (!row.getIsSelected()) {
              row.getToggleSelectedHandler()(event);
            }
          } else if (onDoubleClick) {
            onDoubleClick();
          }
        }}
      >
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
};

type ValidationReorderRowProps = ValidationRowProps & ReorderRowProps;

export const ValidationReorderRow = ({ rowPathSuffix, children, ...props }: ValidationReorderRowProps) => {
  const message = useValidationRow(rowPathSuffix);
  return (
    <ReorderRow message={message} {...props}>
      {children}
    </ReorderRow>
  );
};
