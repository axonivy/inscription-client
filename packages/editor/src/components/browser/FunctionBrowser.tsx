import { useState } from 'react';
import { Input } from '../widgets';
import type { UseBrowserImplReturnValue } from './useBrowser';
import { IvyIcons } from '@axonivy/editor-icons';
export const FUNCTION_BROWSER_ID = 'func' as const;

export const useFuncBrowser = (): UseBrowserImplReturnValue => {
  const [value, setValue] = useState('function');
  return {
    id: FUNCTION_BROWSER_ID,
    name: 'Function',
    content: <FunctionBrowser value={value} onChange={setValue} />,
    accept: () => value,
    icon: IvyIcons.Function
  };
};

const FunctionBrowser = (props: { value: string; onChange: (value: string) => void }) => {
  return <Input {...props} />;
};
