import './Table.css';

export const Table = (props: { children?: JSX.Element[] }) => (
  <div className='table-root'>
    <table className='table'>{props.children}</table>
  </div>
);
