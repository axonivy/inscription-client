import './ActionCell.css';
import type { IvyIcons } from '@axonivy/ui-icons';
import { Button, Flex, useReadonly } from '@axonivy/ui-components';
import { TableCell } from './TableCell';

interface Action {
  label: string;
  icon: IvyIcons;
  action: () => void;
  disabled?: boolean;
}

export const ActionCell = ({ actions }: { actions: Action[] }) => {
  const readonly = useReadonly();
  return (
    <TableCell className='action-cell'>
      <Flex direction='row' gap={1} style={{ justifyContent: 'flex-end' }}>
        {actions.map((action, index) => (
          <Button key={index} onClick={action.action} disabled={readonly || action.disabled} aria-label={action.label} icon={action.icon} />
        ))}
      </Flex>
    </TableCell>
  );
};
