import './ValidationRow.css';
import { ReactNode } from 'react';
import { InscriptionValidation } from '@axonivy/inscription-protocol';

type ValidationRowProps = {
  path: string;
  validations: InscriptionValidation[];
  children: ReactNode;
};

export const ValidationRow = ({ path, validations, children }: ValidationRowProps) => {
  const message = validations.find(val => val.path === path);
  return <tr className={`row ${message ? `row-${message.severity.toLocaleLowerCase()}` : ''}`}>{children}</tr>;
};
