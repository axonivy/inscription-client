import type { Row } from '@tanstack/react-table';
import type { GenericData } from '../GenericBrowser';
import type { HiddenFunctionInfo } from './FunctionBrowser';

export const getParentNames = (currentRow: Row<GenericData<HiddenFunctionInfo>>, parentNames: string[] = []): string[] => {
  parentNames.push(
    currentRow.original.hiddenInfo?.isField
      ? currentRow.original.title
      : currentRow.original.title + '(' + currentRow.original.hiddenInfo?.params.map(param => param.type.split('.').pop()).join(', ') + ')'
  );
  const parentRow = currentRow.getParentRow();
  if (parentRow !== undefined) {
    return getParentNames(parentRow, parentNames);
  }
  return parentNames;
};
