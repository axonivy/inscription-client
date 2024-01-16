import './TableCell.css';

export const TableCell = ({ children, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
  <td {...props} className='table-cell'>
    {children}
  </td>
);
