import { Condition } from '../database/Condition';
import { Limit } from '../database/Limit';
import { TableSelect } from '../database/TableSelect';
import { TableReadFields } from '../database/TableReadFields';
import { TableSort } from '../database/TableSort';

export const QueryRead = () => {
  return (
    <>
      <TableSelect />
      <TableReadFields />
      <Condition />
      <TableSort />
      <Limit />
    </>
  );
};
