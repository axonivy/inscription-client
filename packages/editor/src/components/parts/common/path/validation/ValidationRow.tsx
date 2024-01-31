import type { ReactNode } from 'react';
import { mergePaths, usePath, useValidations } from '../../../../../context';
import type { ReorderRowProps, SelectRowProps } from '../../../../widgets';
import { MessageRow, MessageRowWithTr, ReorderRow, SelectRow, styleMessageRow } from '../../../../widgets';

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
    <MessageRowWithTr message={message} title={title} colSpan={colSpan ? colSpan : 2}>
      {children}
    </MessageRowWithTr>
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
      <SelectRow row={row} onDoubleClick={onDoubleClick} title={title} className={styleMessageRow(message)}>
        {children}
      </SelectRow>
      <MessageRow colSpan={colSpan ? colSpan : 2} message={message} />
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
