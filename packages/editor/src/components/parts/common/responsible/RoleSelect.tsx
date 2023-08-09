import { useMemo } from 'react';
import { Select, SelectItem } from '../../../widgets';
import { useEditorContext, useMeta } from '../../../../context';

const DEFAULT_ROLE: SelectItem = { label: 'Everybody', value: 'Everybody' } as const;

type RoleSelectProps = {
  value?: string;
  onChange: (change: string) => void;
};

const RoleSelect = ({ value, onChange }: RoleSelectProps) => {
  const { context } = useEditorContext();
  const roleItems = useMeta('meta/workflow/roles', context, []).data.map<SelectItem>(role => {
    return { label: role.id, value: role.id };
  });
  const selectedRole = useMemo<SelectItem | undefined>(() => {
    if (value) {
      return roleItems.find(e => e.value === value) ?? { label: value, value };
    }
    return DEFAULT_ROLE;
  }, [value, roleItems]);

  return <Select items={roleItems} value={selectedRole} onChange={item => onChange(item.value)} />;
};

export default RoleSelect;
