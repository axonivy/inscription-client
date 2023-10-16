import { memo } from 'react';
import { PathFieldset } from '../path/PathFieldset';
import MappingTree from './MappingTree';
import { SchemaKeys, VariableInfo } from '@axonivy/inscription-protocol';
import { useTableGlobalFilter, useTableOnlyInscribed } from './useMappingTree';
import { BrowserType } from '../../../../components/browser';

export type MappingPartProps = {
  data: Record<string, string>;
  variableInfo: VariableInfo;
  onChange: (change: Record<string, string>) => void;
  path?: SchemaKeys;
  browsers: BrowserType[];
};

const MappingPart = ({ path, ...props }: MappingPartProps) => {
  const globalFilter = useTableGlobalFilter();
  const onlyInscribedFilter = useTableOnlyInscribed();

  return (
    <PathFieldset label='Mapping' controls={[globalFilter.control, onlyInscribedFilter.control]} path={path ?? 'map'}>
      <MappingTree {...props} globalFilter={globalFilter} onlyInscribedFilter={onlyInscribedFilter} />
    </PathFieldset>
  );
};

export default memo(MappingPart);
