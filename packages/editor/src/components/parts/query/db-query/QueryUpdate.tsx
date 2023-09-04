import { Condition } from '../database/Condition';
import { TableSelect } from '../database/TableSelect';
import { TableFields } from '../database/TableFields';

export const QueryUpdate = () => (
  <>
    <TableSelect />
    <TableFields />
    <Condition />
  </>
);
