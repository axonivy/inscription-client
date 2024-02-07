import './RoleSelect.css';
import { useMemo } from 'react';
import type { FieldsetInputProps, SelectItem } from '../../../widgets';
import { Select } from '../../../widgets';
import { useRoles } from './useRoles';
import { Browser, useBrowser } from '../../../browser';
import { usePath } from '../../../../context';
import type { BrowserValue } from '../../../browser/Browser';

const DEFAULT_ROLE: SelectItem = { label: 'Everybody', value: 'Everybody' } as const;

type RoleSelectProps = {
  value?: string;
  onChange: (change: string) => void;
  inputProps?: FieldsetInputProps;
  showTaskRoles?: boolean;
};

const RoleSelect = ({ value, onChange, inputProps, showTaskRoles }: RoleSelectProps) => {
  const { roles: roleItems } = useRoles(showTaskRoles);
  const browser = useBrowser();
  const path = usePath();
  const selectedRole = useMemo<SelectItem | undefined>(() => {
    if (value) {
      return roleItems.find(e => e.value === value) ?? { label: value, value };
    }
    return DEFAULT_ROLE;
  }, [value, roleItems]);

  return (
    <div className='role-select'>
      <Select items={roleItems} value={selectedRole} onChange={item => onChange(item.value)} inputProps={inputProps} />
      <Browser
        {...browser}
        types={['role']}
        location={path}
        accept={(change: BrowserValue) => onChange(change.cursorValue)}
        roleOptions={{ showTaskRoles }}
      />
    </div>
  );
};

export default RoleSelect;
