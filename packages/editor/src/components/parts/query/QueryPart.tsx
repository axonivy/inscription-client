import { useQueryData } from './useQueryData.js';
import type { QueryData } from '@axonivy/inscription-protocol';
import { DatabaseSelect } from './database/DatabaseSelect.js';
import { QueryKindSelect } from './database/QueryKindSelect.js';
import type { PartProps} from '../../../components/editors/index.js';
import { usePartDirty, usePartState } from '../../../components/editors/index.js';
import { PathContext, useValidations } from '../../../context/index.js';
import { QueryRead } from './db-query/QueryRead.js';
import { QueryWrite } from './db-query/QueryWrite.js';
import { QueryUpdate } from './db-query/QueryUpdate.js';
import { QueryDelete } from './db-query/QueryDelete.js';
import { QueryAny } from './db-query/QueryAny.js';
import { DbExceptionHandler } from './database/DbExceptionHandler.js';

export function useQueryPart(): PartProps {
  const { config, defaultConfig, initConfig, reset } = useQueryData();
  const queryVal = useValidations(['query']);
  const exceptionVal = useValidations(['exceptionHandler']);
  const compareData = (data: QueryData) => [data.query, data.exceptionHandler];
  const state = usePartState(compareData(defaultConfig), compareData(config), [...queryVal, ...exceptionVal]);
  const dirty = usePartDirty(compareData(initConfig), compareData(config));
  return { name: 'Query', state: state, reset: { dirty, action: () => reset() }, content: <QueryPart /> };
}

const QueryPart = () => {
  const query = useQuery();
  return (
    <>
      <PathContext path='query'>
        <QueryKindSelect />
        <DatabaseSelect />
        {query}
      </PathContext>
      <DbExceptionHandler />
    </>
  );
};

const useQuery = () => {
  const { config } = useQueryData();
  switch (config.query.sql.kind) {
    case 'READ':
      return <QueryRead />;
    case 'WRITE':
      return <QueryWrite />;
    case 'UPDATE':
      return <QueryUpdate />;
    case 'DELETE':
      return <QueryDelete />;
    case 'ANY':
      return <QueryAny />;
  }
};
