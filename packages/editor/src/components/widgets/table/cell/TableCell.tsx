import './TableCell.js';
import type { ReactNode } from 'react';

export const TableCell = (props: { children: ReactNode }) => <td className='table-cell'>{props.children}</td>;
