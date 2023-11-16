import { useEffect, useState } from 'react';
import type { SelectItem } from '../../../../components/widgets';
import { useEditorContext, useMeta } from '../../../../context';
import { EMPTY_ROLE, type RoleMeta } from '@axonivy/inscription-protocol';

export const useRoles = (showTaskRoles = false) => {
  const [roles, setRoles] = useState<SelectItem[]>([]);
  const { context } = useEditorContext();
  const roleTree = useMeta('meta/workflow/roleTree', context, EMPTY_ROLE).data;
  const taskRoles = useMeta('meta/workflow/taskRoles', context, []).data;

  useEffect(() => {
    const flatRoles: SelectItem[] = [];
    const addRoles = (role: RoleMeta) => {
      flatRoles.push({ label: role.id, value: role.id });
      role.children.forEach(addRoles);
    };
    if (showTaskRoles) {
      taskRoles.forEach(addRoles);
    }
    addRoles(roleTree);
    setRoles(flatRoles);
  }, [roleTree, showTaskRoles, taskRoles]);

  return roles;
};
