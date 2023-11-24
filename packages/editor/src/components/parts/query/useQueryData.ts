import type { QueryData } from '@axonivy/inscription-protocol';
import { produce } from 'immer';
import type { Consumer, DataUpdater } from '../../../types/lambda.js';
import type { ConfigDataContext} from '../../../context/index.js';
import { useConfigDataContext } from '../../../context/index.js';

export function useQueryData(): ConfigDataContext<QueryData> & {
  update: DataUpdater<QueryData['query']>;
  updateSql: DataUpdater<QueryData['query']['sql']>;
  updateException: Consumer<string>;
  reset: () => void;
} {
  const { setConfig, ...config } = useConfigDataContext();

  const update: DataUpdater<QueryData['query']> = (field, value) => {
    setConfig(
      produce((draft: QueryData) => {
        draft.query[field] = value;
      })
    );
  };

  const updateSql: DataUpdater<QueryData['query']['sql']> = (field, value) => {
    setConfig(
      produce((draft: QueryData) => {
        draft.query.sql[field] = value;
      })
    );
  };

  const updateException = (value: string) => {
    setConfig(
      produce(draft => {
        draft.exceptionHandler = value;
      })
    );
  };

  const reset = () =>
    setConfig(
      produce(draft => {
        draft.query = config.initConfig.query;
        draft.exceptionHandler = config.initConfig.exceptionHandler;
      })
    );

  return {
    ...config,
    update,
    updateSql,
    updateException,
    reset
  };
}
