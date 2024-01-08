import { forwardRef, type ReactNode } from 'react';
import './Table.css';
import { IconInput } from '../../input';
import { IvyIcons } from '@axonivy/editor-icons';

type TableProps = {
  search?: { value: string; onChange: (value: string) => void };
  children?: ReactNode;
};

export const Table = forwardRef<HTMLDivElement, TableProps>(({ children, search }, forwardRef) => (
  <div className='table-root'>
    {search && <IconInput icon={IvyIcons.Search} initFocus={true} placeholder='Search' {...search} />}
    <div className='table-container'>
      <div ref={forwardRef}>
        <table className='table'>{children}</table>
      </div>
    </div>
  </div>
));
