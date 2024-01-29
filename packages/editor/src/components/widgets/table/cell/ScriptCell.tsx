import type { CellContext } from '@tanstack/react-table';
import { CodeEditorCell } from './CodeEditorCell';
import type { BrowserType } from '../../../../components/browser';

export const ScriptCell = <TData,>({
  cell,
  type,
  browsers,
  placeholder
}: {
  cell: CellContext<TData, unknown>;
  type: string;
  browsers: BrowserType[];
  placeholder?: string;
}) => <CodeEditorCell cell={cell} makro={false} type={type} browsers={browsers} placeholder={placeholder} />;
