import { memo } from 'react';
import MappingTree from './MappingTree';
import type { SchemaKeys, VariableInfo } from '@axonivy/inscription-protocol';
import { useTableGlobalFilter, useTableOnlyInscribed } from './useMappingTree';
import type { BrowserType } from '../../../../components/browser';
import { PathCollapsible } from '../path/PathCollapsible';

export type MappingPartProps = {
  data: Record<string, string>;
  variableInfo: VariableInfo;
  onChange: (change: Record<string, string>) => void;
  path?: SchemaKeys;
  browsers: BrowserType[];
};

const MappingPart = ({ path, data, ...props }: MappingPartProps) => {
  const globalFilter = useTableGlobalFilter();
  const onlyInscribedFilter = useTableOnlyInscribed();

  return (
    <PathCollapsible
      label='Mapping'
      controls={[globalFilter.control, onlyInscribedFilter.control]}
      path={path ?? 'map'}
      defaultOpen={Object.keys(data).length > 0}
    >
      <MappingTree data={data} {...props} globalFilter={globalFilter} onlyInscribedFilter={onlyInscribedFilter} />
    </PathCollapsible>
  );
};

export default memo(MappingPart);
