import './ActionCell.css';
import { IvyIcons } from '@axonivy/editor-icons';
import { useReadonly } from '../../../../context';
import IvyIcon from '../../IvyIcon';
import { TableCell } from './TableCell';

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
          <button key={index} onClick={action.action} disabled={readonly} aria-label={action.label}>
            <IvyIcon icon={action.icon} />
          </button>
        ))}
      </span>
    </TableCell>
  );
};
