import type { CellContext } from '@tanstack/react-table';
import { CodeEditorCell } from './CodeEditorCell';

export const MacroCell = <TData,>({ cell, placeholder }: { cell: CellContext<TData, unknown>; placeholder?: string }) => (
  <CodeEditorCell cell={cell} makro={true} browsers={['attr', 'func', 'cms']} placeholder={placeholder} />
);
