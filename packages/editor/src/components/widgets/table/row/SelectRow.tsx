import './SelectRow.css';
import { Row } from '@tanstack/react-table';
import { ReactNode } from 'react';

export const SelectRow = <TData extends object>({ row, children }: { row: Row<TData>; children: ReactNode }) => (
  <tr className='selectable-row' data-state={row.getIsSelected() ? 'selected' : ''} onClick={row.getToggleSelectedHandler()}>
    {children}
  </tr>
);
