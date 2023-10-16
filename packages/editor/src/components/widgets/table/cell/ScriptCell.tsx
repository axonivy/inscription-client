import { CellContext } from '@tanstack/react-table';
import { CodeEditorCell } from './CodeEditorCell';
import { BrowserType } from '../../../../components/browser';

export const ScriptCell = <TData,>({
  cell,
  type,
  browsers
}: {
  cell: CellContext<TData, unknown>;
  type: string;
  browsers: BrowserType[];
}) => <CodeEditorCell cell={cell} makro={false} type={type} browsers={browsers} />;
