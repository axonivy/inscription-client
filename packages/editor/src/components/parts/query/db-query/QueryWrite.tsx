import { TableSelect } from '../database/TableSelect';
import { TableFields } from '../database/TableFields';

export const QueryWrite = () => {
  return (
    <>
      <TableSelect />
      <TableFields />
    </>
  );
};
