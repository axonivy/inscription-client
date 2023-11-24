import type { ReactNode } from 'react';
import { mergePaths, usePath, useValidations } from '../../../../../context/index.js';
import type { ReorderRowProps } from '../../../../widgets/index.js';
import { MessageRow, ReorderRow } from '../../../../widgets/index.js';

type ValidationRowProps = {
  rowPathSuffix: string | number;
  children: ReactNode;
  title?: string;
};

const useValidationRow = (rowPathSuffix: string | number) => {
  const validations = useValidations();
  const path = usePath();
  const rowPath = mergePaths(path, [rowPathSuffix]);
  return validations.find(val => val.path === rowPath);
};

export const ValidationRow = ({ rowPathSuffix, children, title }: ValidationRowProps) => {
  const message = useValidationRow(rowPathSuffix);
  return (
    <MessageRow message={message} title={title}>
      {children}
    </MessageRow>
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
