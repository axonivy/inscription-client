import type { ReactNode } from 'react';
import './Table.css';
import { IconInput } from '../../input';
import { IvyIcons } from '@axonivy/editor-icons';

type TableProps = {
  search?: { value: string; onChange: (value: string) => void };
  children?: ReactNode;
};

export const Table = ({ search, children }: TableProps) => (
  <div className='table-root'>
    {search && <IconInput icon={IvyIcons.Search} initFocus={true} placeholder='Search' {...search} />}
    <div className='table-container'>
      <table className='table'>{children}</table>
    </div>
  </div>
);
