import { Limit } from '../database/Limit.js';
import { Statement } from '../database/Statement.js';

export const QueryAny = () => (
  <>
    <Statement />
    <Limit />
  </>
);
