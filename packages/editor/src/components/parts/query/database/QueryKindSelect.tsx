import { Select, SelectItem, useFieldset } from '../../../widgets';
import { useQueryData } from '../useQueryData';
import { PathFieldset } from '../../common';
import { QUERY_KIND, QueryKind } from '@axonivy/inscription-protocol';
import { PathContext } from '../../../../context';
import { useMemo } from 'react';

export const QueryKindSelect = () => {
  const { config, updateSql } = useQueryData();
  const items = useMemo<SelectItem[]>(() => Object.entries(QUERY_KIND).map(([label, value]) => ({ label, value })), []);

  const fieldset = useFieldset();
  return (
    <PathContext path='sql'>
      <PathFieldset label='Query Kind' path='kind' {...fieldset.labelProps}>
        <Select
          value={{ label: config.query.sql.kind, value: config.query.sql.kind }}
          onChange={item => updateSql('kind', item.value as QueryKind)}
          items={items}
          inputProps={fieldset.inputProps}
        />
      </PathFieldset>
    </PathContext>
  );
};
