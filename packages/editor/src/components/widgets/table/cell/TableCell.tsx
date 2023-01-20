import './TableCell.css';
import { ReactNode } from 'react';

export const TableCell = (props: { children: ReactNode }) => <td className='table-cell'>{props.children}</td>;
