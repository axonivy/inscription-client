import { CellContext } from '@tanstack/react-table';
import { CodeEditorCell } from './CodeEditorCell';

export const MacroCell = <TData,>({ cell }: { cell: CellContext<TData, unknown> }) => (
  <CodeEditorCell cell={cell} makro={true} browsers={['attr', 'func', 'cms']} />
);
