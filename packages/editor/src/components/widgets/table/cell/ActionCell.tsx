import './ActionCell.css';
import { IvyIcons } from '@axonivy/editor-icons';
import { useReadonly } from '../../../../context';
import { TableCell } from './TableCell';
import Button from '../../button/Button';

interface Action {
  label: string;
  icon: IvyIcons;
  action: () => void;
}

export const ActionCell = (props: { actions: Action[] }) => {
  const readonly = useReadonly();
  return (
    <TableCell>
      <span className='action-buttons'>
        {props.actions.map((action, index) => (
          <Button key={index} onClick={action.action} disabled={readonly} aria-label={action.label} icon={action.icon} />
        ))}
      </span>
    </TableCell>
  );
};
