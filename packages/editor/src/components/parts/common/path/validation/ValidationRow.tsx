import type { ReactNode } from 'react';
import { mergePaths, usePath, useValidations } from '../../../../../context';
import type { MessageRowProps, ReorderRowProps, SelectRowProps } from '../../../../widgets';
import { MessageRow, SelectRow, SelectableReorderRow, styleMessageRow } from '../../../../widgets';

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

type ValidationReorderRowProps<TData> = ValidationRowProps & ReorderRowProps & SelectRowProps<TData> & MessageRowProps;

export const ValidationSelectableReorderRow = <TData extends object>({
  rowPathSuffix,
  children,
  ...props
}: ValidationReorderRowProps<TData>) => {
  const message = useValidationRow(rowPathSuffix);
  return (
    <SelectableReorderRow message={message} {...props}>
      {children}
    </SelectableReorderRow>
  );
};
