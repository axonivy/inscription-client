import { memo } from 'react';
import { PathFieldset } from '../path/PathFieldset';
import MappingTree from './MappingTree';
import { VariableInfo } from '@axonivy/inscription-protocol';
import { useTableGlobalFilter, useTableOnlyInscribed } from './useMappingTree';

export type MappingPartProps = {
  data: Record<string, string>;
  variableInfo: VariableInfo;
  onChange: (change: Record<string, string>) => void;
};

const MappingPart = (props: MappingPartProps) => {
  const globalFilter = useTableGlobalFilter();
  const onlyInscribedFilter = useTableOnlyInscribed();

  return (
    <PathFieldset label='Mapping' controls={[globalFilter.control, onlyInscribedFilter.control]} path='map'>
      <MappingTree {...props} globalFilter={globalFilter} onlyInscribedFilter={onlyInscribedFilter} />
    </PathFieldset>
  );
};

export default memo(MappingPart);
