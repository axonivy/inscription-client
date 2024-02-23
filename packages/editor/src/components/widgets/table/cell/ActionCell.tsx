import './ActionCell.css';
import type { IvyIcons } from '@axonivy/ui-icons';
import { useReadonly } from '../../../../context';
import { TableCell } from './TableCell';
import Button from '../../button/Button';

interface Action {
  label: string;
  icon: IvyIcons;
  action: () => void;
  disabled?: boolean;
}

export const ActionCell = ({ actions }: { actions: Action[] }) => {
  const readonly = useReadonly();
  return (
    <TableCell>
      <span className='action-buttons'>
        {actions.map((action, index) => (
          <Button key={index} onClick={action.action} disabled={readonly || action.disabled} aria-label={action.label} icon={action.icon} />
        ))}
      </span>
    </TableCell>
  );
};
