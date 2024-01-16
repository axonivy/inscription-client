import './TableCell.css';
import type { ReactNode } from 'react';

export const TableCell = (props: { children: ReactNode; cellWidth?: number }) => (
  <td className='table-cell' style={props.cellWidth ? { width: `${props.cellWidth}px` } : {}}>
    {props.children}
  </td>
);
