import { Condition } from '../database/Condition.js';
import { TableSelect } from '../database/TableSelect.js';

export const QueryDelete = () => (
  <>
    <TableSelect />
    <Condition />
  </>
);
