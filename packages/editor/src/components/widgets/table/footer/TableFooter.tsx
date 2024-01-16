import './TableFooter.css';
import { IvyIcons } from '@axonivy/editor-icons';
import { useReadonly } from '../../../../context';
import { useState, type ReactNode } from 'react';
import Button from '../../button/Button';

export const TableFooter = (props: { children: ReactNode }) => {
  return <tfoot className='table-footer'>{props.children}</tfoot>;
};

export const TableAddRow = (props: { colSpan: number; addRow: () => void }) => {
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  const readonly = useReadonly();
  return (
    <div className='add-row-container'>
      <Button
        icon={IvyIcons.Plus}
        onClick={props.addRow}
        disabled={readonly}
        aria-label='Add row'
        onFocus={() => setIsButtonHovered(true)}
        onBlur={() => setIsButtonHovered(false)}
        onMouseEnter={() => setIsButtonHovered(true)}
        onMouseLeave={() => setIsButtonHovered(false)}
      />
      <div className={`add-line ${isButtonHovered ? 'hovered' : ''}`} />
    </div>
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
