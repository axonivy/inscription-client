import './TableFooter.js';
import { IvyIcons } from '@axonivy/editor-icons';
import { useReadonly } from '../../../../context/index.js';
import type { ReactNode } from 'react';
import Button from '../../button/Button.js';

export const TableFooter = (props: { children: ReactNode }) => {
  return <tfoot className='table-footer'>{props.children}</tfoot>;
};

export const TableAddRow = (props: { colSpan: number; addRow: () => void }) => {
  const readonly = useReadonly();
  return (
    <tr>
      <th colSpan={props.colSpan} className='add-row'>
        <Button icon={IvyIcons.Plus} onClick={props.addRow} disabled={readonly} aria-label='Add row' />
      </th>
    </tr>
  );
};
