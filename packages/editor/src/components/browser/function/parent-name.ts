import type { Row } from '@tanstack/react-table';
import type { GenericData } from '../GenericBrowser';
import type { UpdatedFunction } from './FunctionBrowser';

export const getParentNames = (currentRow: Row<GenericData<UpdatedFunction>>, parentNames: string[] = []): string[] => {
  parentNames.push(
    currentRow.original.browserObject.isField
      ? currentRow.original.browserObject.name
      : currentRow.original.browserObject.name +
          '(' +
          currentRow.original.browserObject.params.map(param => param.type.split('.').pop()).join(', ') +
          ')'
  );
  const parentRow = currentRow.getParentRow();
  if (parentRow !== undefined) {
    return getParentNames(parentRow, parentNames);
  }
  return parentNames;
};
