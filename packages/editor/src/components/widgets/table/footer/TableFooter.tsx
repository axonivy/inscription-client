import './TableFooter.css';
import { IvyIcons } from '@axonivy/editor-icons';
import { useReadonly } from '../../../../context';
import IvyIcon from '../../IvyIcon';
import { ReactNode } from 'react';

export const TableFooter = (props: { children: ReactNode }) => {
  return <tfoot className='table-footer'>{props.children}</tfoot>;
};

export const TableAddRow = (props: { colSpan: number; addRow: () => void }) => {
  const readonly = useReadonly();
  return (
    <tr>
      <th colSpan={props.colSpan} className='add-row'>
        <button onClick={props.addRow} disabled={readonly} aria-label='Add row'>
          <IvyIcon icon={IvyIcons.Add} />
        </button>
      </th>
    </tr>
  );
};
