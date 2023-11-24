import { Condition } from '../database/Condition.js';
import { TableSelect } from '../database/TableSelect.js';
import { TableFields } from '../database/TableFields.js';

export const QueryUpdate = () => (
  <>
    <TableSelect />
    <TableFields />
    <Condition />
  </>
);
