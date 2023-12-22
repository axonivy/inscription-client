import './TableFooter.css';
import { IvyIcons } from '@axonivy/editor-icons';
import { useReadonly } from '../../../../context';
import type { ReactNode } from 'react';
import Button from '../../button/Button';

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

export const TableShowMore = (props: { colSpan: number; showMore: () => void; helpertext: string }) => {
  return (
    <tr>
      <th colSpan={props.colSpan} className='show-more-rows'>
        <Button icon={IvyIcons.Dots} onClick={props.showMore} aria-label='Show more rows'>
          {props.helpertext}
        </Button>
      </th>
    </tr>
  );
};
