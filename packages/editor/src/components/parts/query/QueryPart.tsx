import { useQueryData } from './useQueryData';
import type { QueryData } from '@axonivy/inscription-protocol';
import { DatabaseSelect } from './database/DatabaseSelect';
import { QueryKindSelect } from './database/QueryKindSelect';
import type { PartProps } from '../../../components/editors';
import { usePartDirty, usePartState } from '../../../components/editors';
import { PathContext, useValidations } from '../../../context';
import { QueryRead } from './db-query/QueryRead';
import { QueryWrite } from './db-query/QueryWrite';
import { QueryUpdate } from './db-query/QueryUpdate';
import { QueryDelete } from './db-query/QueryDelete';
import { QueryAny } from './db-query/QueryAny';
import { DbExceptionHandler } from './database/DbExceptionHandler';
import { TableSelect } from './database/TableSelect';
import { ValidationCollapsible } from '../common';

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
  const { config } = useQueryData();
  const query = useQuery();
  return (
    <>
      <PathContext path='query'>
        <ValidationCollapsible label='Database' defaultOpen={config.query.dbName.length > 0}>
          <QueryKindSelect />
          <DatabaseSelect />
          {config.query.sql.kind !== 'ANY' && <TableSelect />}
        </ValidationCollapsible>
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
