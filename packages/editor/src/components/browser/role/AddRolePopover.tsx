import { useState } from 'react';
import {
  BasicField,
  Button,
  Flex,
  Input,
  Message,
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverTrigger,
  toast
} from '@axonivy/ui-components';
import { IvyIcons } from '@axonivy/ui-icons';
import { useFunction } from '../../../context/useFunction';
import { useQueryClient } from '@tanstack/react-query';
import { useEditorContext } from '../../../context';
import type { RoleMeta } from '@axonivy/inscription-protocol';
import { type Table } from '@tanstack/react-table';
import { useRoles } from '../../parts/common/responsible/useRoles';
import { isValidRowSelected, newNameExists, newNameIsValid } from './validate-role';

export const AddRolePopover = ({
  value,
  table,
  setAddedRoleName
}: {
  value: string;
  table: Table<RoleMeta>;
  setAddedRoleName: (value: string) => void;
}) => {
  const [open, setOpen] = useState(false);
  const { taskRoles } = useRoles();
  const [newRoleName, setNewRoleName] = useState('');

  const queryClient = useQueryClient();
  const { context } = useEditorContext();
  const addRole = useFunction(
    'meta/workflow/addRole',
    {
      context,
      newRole: { identifier: 'test', parent: 'Everybody' }
    },
    {
      onSuccess: () => {
        toast.info('Role successfully added');
        queryClient.invalidateQueries({ queryKey: ['meta/workflow/roleTree', context] });
        setOpen(false);
      },
      onError: error => {
        toast.error('Failed to add new role', { description: error.message });
      }
    }
  );

  return (
    <Popover
      open={open}
      onOpenChange={e => {
        setOpen(e);
        if (e) setNewRoleName('');
      }}
    >
      <PopoverTrigger asChild>
        <Button
          icon={IvyIcons.Plus}
          aria-label={`Add Role to ${value}`}
          title={`Add Role to ${value}`}
          disabled={!isValidRowSelected(table, taskRoles)}
        />
      </PopoverTrigger>
      <PopoverContent sideOffset={12} collisionPadding={5} style={{ zIndex: '10000' }}>
        <Flex direction='column' gap={2} alignItems='center'>
          <BasicField label='New role name' style={{ width: '100%' }}>
            <Input value={newRoleName} onChange={e => setNewRoleName(e.target.value)} />
          </BasicField>
          {newNameExists(table, newRoleName) && <Message variant='error' message='A role with that name already exists' />}
          <Button
            icon={IvyIcons.Plus}
            onClick={() => {
              addRole.mutate({
                context,
                newRole: { identifier: newRoleName, parent: value }
              });
              setAddedRoleName(newRoleName);
            }}
            aria-label='Add new Role'
            title='Add new Role'
            disabled={!newNameIsValid(table, newRoleName)}
            style={{ width: '100%' }}
          >
            Add Role to {value}
          </Button>
        </Flex>
        <PopoverArrow />
      </PopoverContent>
    </Popover>
  );
};
