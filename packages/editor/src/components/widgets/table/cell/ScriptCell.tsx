import type { CellContext } from '@tanstack/react-table';
import { CodeEditorCell } from './CodeEditorCell.js';
import type { BrowserType } from '../../../../components/browser/index.js';

export const ScriptCell = <TData,>({
  cell,
  type,
  browsers
}: {
  cell: CellContext<TData, unknown>;
  type: string;
  browsers: BrowserType[];
}) => <CodeEditorCell cell={cell} makro={false} type={type} browsers={browsers} />;
