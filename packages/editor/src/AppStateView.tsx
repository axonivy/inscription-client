import type { ReactNode } from 'react';
import './App.css';
import { Flex } from '@axonivy/ui-components';

function AppStateView({ children }: { children: ReactNode }) {
  return (
    <Flex direction='column' alignItems='center' justifyContent='center' className='editor-root editor-state'>
      {children}
    </Flex>
  );
}

export default AppStateView;
