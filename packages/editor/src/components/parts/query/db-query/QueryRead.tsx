import { Condition } from '../database/Condition.js';
import { Limit } from '../database/Limit.js';
import { TableSelect } from '../database/TableSelect.js';
import { TableReadFields } from '../database/TableReadFields.js';
import { TableSort } from '../database/TableSort.js';

export const QueryRead = () => (
  <>
    <TableSelect />
    <TableReadFields />
    <Condition />
    <TableSort />
    <Limit />
  </>
);
