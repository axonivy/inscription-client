import './TableFooter.css';
import { IvyIcons } from '@axonivy/editor-icons';
import { useReadonly } from '../../../../context';
import { ReactNode } from 'react';
import Button from '../../button/Button';

export const TableFooter = (props: { children: ReactNode }) => {
  return <tfoot className='table-footer'>{props.children}</tfoot>;
};

export const TableAddRow = (props: { colSpan: number; addRow: () => void }) => {
  const readonly = useReadonly();
  return (
    <tr>
      <th colSpan={props.colSpan} className='add-row'>
        <Button icon={IvyIcons.Add} onClick={props.addRow} disabled={readonly} aria-label='Add row' />
      </th>
    </tr>
  );
};
