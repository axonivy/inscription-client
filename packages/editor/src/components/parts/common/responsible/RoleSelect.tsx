import { useMemo } from 'react';
import type { FieldsetInputProps, SelectItem } from '../../../widgets/index.js';
import { Select } from '../../../widgets/index.js';
import { useRoles } from './useRoles.js';

const DEFAULT_ROLE: SelectItem = { label: 'Everybody', value: 'Everybody' } as const;

type RoleSelectProps = {
  value?: string;
  onChange: (change: string) => void;
  inputProps?: FieldsetInputProps;
  showtaskRoles?: boolean;
};

const RoleSelect = ({ value, onChange, inputProps, showtaskRoles }: RoleSelectProps) => {
  const roleItems = useRoles(showtaskRoles);
  const selectedRole = useMemo<SelectItem | undefined>(() => {
    if (value) {
      return roleItems.find(e => e.value === value) ?? { label: value, value };
    }
    return DEFAULT_ROLE;
  }, [value, roleItems]);

  return <Select items={roleItems} value={selectedRole} onChange={item => onChange(item.value)} inputProps={inputProps} />;
};

export default RoleSelect;
