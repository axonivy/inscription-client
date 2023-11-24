import { memo } from 'react';
import { PathFieldset } from '../path/PathFieldset.js';
import MappingTree from './MappingTree.js';
import type { SchemaKeys, VariableInfo } from '@axonivy/inscription-protocol';
import { useTableGlobalFilter, useTableOnlyInscribed } from './useMappingTree.js';
import type { BrowserType } from '../../../../components/browser/index.js';

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
