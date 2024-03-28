import { forwardRef, type ReactNode } from 'react';
import './Table.css';
import { SearchInput } from '../../input';

type TableProps = {
  search?: { value: string; onChange: (value: string) => void };
  children?: ReactNode;
};

export const Table = forwardRef<HTMLDivElement, TableProps>(({ children, search }, forwardRef) => (
  <div className='table-root'>
    {search && <SearchInput placeholder='Search' {...search} />}
    <div ref={forwardRef} className='table-container'>
      <div>
        <table className='table'>{children}</table>
      </div>
    </div>
  </div>
));
