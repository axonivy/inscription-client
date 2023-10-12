import { HttpMethod, RestRequestData, ScriptMappings } from '@axonivy/inscription-protocol';
import { produce } from 'immer';
import { Consumer, DataUpdater } from '../../../types/lambda';
import { ConfigDataContext, useConfigDataContext } from '../../../context';

export function useRestRequestData(): ConfigDataContext<RestRequestData> & {
  update: DataUpdater<RestRequestData>;
  updateBody: DataUpdater<RestRequestData['body']>;
  updateEntity: DataUpdater<RestRequestData['body']['entity']>;
  updateMethod: Consumer<string>;
  updateTarget: DataUpdater<RestRequestData['target']>;
  updateAcceptHeader: Consumer<string>;
  updateParameters: Consumer<{ queryParams: ScriptMappings; templateParams: ScriptMappings }>;
  resetData: () => void;
} {
  const { setConfig, ...config } = useConfigDataContext();

  const update: DataUpdater<RestRequestData> = (field, value) => {
    setConfig(
      produce((draft: RestRequestData) => {
        draft[field] = value;
      })
    );
  };

  const updateBody: DataUpdater<RestRequestData['body']> = (field, value) => {
    setConfig(
      produce(draft => {
        draft.body[field] = value;
      })
    );
  };

  const updateEntity: DataUpdater<RestRequestData['body']['entity']> = (field, value) => {
    setConfig(
      produce(draft => {
        draft.body.entity[field] = value;
      })
    );
  };

  const updateMethod: Consumer<string> = value => {
    setConfig(
      produce((draft: RestRequestData) => {
        const [method, path] = value.split(':');
        draft.method = method as HttpMethod;
        draft.target.path = path;
      })
    );
  };

  const updateTarget: DataUpdater<RestRequestData['target']> = (field, value) => {
    setConfig(
      produce(draft => {
        draft.target[field] = value;
      })
    );
  };

  const updateAcceptHeader: Consumer<string> = value => {
    setConfig(
      produce(draft => {
        draft.target.headers['Accept'] = value;
      })
    );
  };

  const updateParameters: Consumer<{ queryParams: ScriptMappings; templateParams: ScriptMappings }> = value => {
    setConfig(
      produce(draft => {
        draft.target.queryParams = value.queryParams;
        draft.target.templateParams = value.templateParams;
      })
    );
  };

  const resetData = () =>
    setConfig(
      produce(draft => {
        draft.target = config.initConfig.target;
        draft.body = config.initConfig.body;
        draft.method = config.initConfig.method;
        draft.code = config.initConfig.code;
      })
    );

  return {
    ...config,
    update,
    updateBody,
    updateEntity,
    updateMethod,
    updateTarget,
    updateAcceptHeader,
    updateParameters,
    resetData
  };
}
