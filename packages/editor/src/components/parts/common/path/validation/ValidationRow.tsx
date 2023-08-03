import { ReactNode } from 'react';
import { mergePaths, usePath, useValidations } from '../../../../../context';
import { MessageRow } from '../../../../widgets';

type ValidationRowProps = {
  rowPathSuffix: string | number;
  children: ReactNode;
};

export const ValidationRow = ({ rowPathSuffix, children }: ValidationRowProps) => {
  const validations = useValidations();
  const path = usePath();
  const rowPath = mergePaths(path, [rowPathSuffix]);
  const message = validations.find(val => val.path === rowPath);
  return <MessageRow message={message}>{children}</MessageRow>;
};
