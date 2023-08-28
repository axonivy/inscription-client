import { Condition } from '../database/Condition';
import { TableSelect } from '../database/TableSelect';

export const QueryDelete = () => {
  return (
    <>
      <TableSelect />
      <Condition />
    </>
  );
};
