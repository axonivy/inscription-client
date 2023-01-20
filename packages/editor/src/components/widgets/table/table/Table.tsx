import { ReactNode } from 'react';
import './Table.css';

export const Table = (props: { children?: ReactNode }) => (
  <div className='table-root'>
    <table className='table'>{props.children}</table>
  </div>
);
