import { cn } from '@axonivy/ui-components';
import './TableCell.css';

export const TableCell = ({ children, className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
  <td {...props} className={cn('table-cell', className)}>
    {children}
  </td>
);
