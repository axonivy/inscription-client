import { CellContext } from '@tanstack/react-table';
import { CodeEditorCell } from './CodeEditorCell';

export const ScriptCell = <TData,>({ cell, type }: { cell: CellContext<TData, unknown>; type: string }) => (
  <CodeEditorCell cell={cell} makro={false} type={type} />
);
