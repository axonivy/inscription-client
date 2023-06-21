import { useConfigDataContext } from '../../../context';
import { StartRequestData } from '@axonivy/inscription-protocol';
import { produce } from 'immer';
import { useCallback } from 'react';
import { Consumer } from '../../../types/lambda';

export function useRequestPartData(): {
  data: StartRequestData;
  defaultData: StartRequestData;
  initData: StartRequestData;
  updateLink: Consumer<string>;
  updateName: Consumer<string>;
  updateDesc: Consumer<string>;
  updateCategory: Consumer<string>;
  updateHttpRequestable: Consumer<boolean>;
  updateShowInStartlist: Consumer<boolean>;
  resetData: () => void;
} {
  const { config, defaultConfig, initConfig, setConfig } = useConfigDataContext();

  const updateLink = useCallback<Consumer<string>>(
    name =>
      setConfig(
        produce(draft => {
          draft.request.linkName = name;
        })
      ),
    [setConfig]
  );

  const updateName = useCallback<Consumer<string>>(
    name =>
      setConfig(
        produce(draft => {
          draft.request.name = name;
        })
      ),
    [setConfig]
  );

  const updateDesc = useCallback<Consumer<string>>(
    desc =>
      setConfig(
        produce(draft => {
          draft.request.description = desc;
        })
      ),
    [setConfig]
  );

  const updateCategory = useCallback<Consumer<string>>(
    category =>
      setConfig(
        produce(draft => {
          draft.request.category = category;
        })
      ),
    [setConfig]
  );

  const updateHttpRequestable = useCallback<Consumer<boolean>>(
    requestable =>
      setConfig(
        produce(draft => {
          draft.request.isHttpRequestable = requestable;
        })
      ),
    [setConfig]
  );

  const updateShowInStartlist = useCallback<Consumer<boolean>>(
    startable =>
      setConfig(
        produce(draft => {
          draft.request.isVisibleOnStartList = startable;
        })
      ),
    [setConfig]
  );

  const resetData = useCallback(
    () =>
      setConfig(
        produce(draft => {
          draft.request = initConfig.request;
        })
      ),
    [setConfig, initConfig]
  );

  return {
    data: config,
    defaultData: defaultConfig,
    initData: initConfig,
    updateLink: updateLink,
    updateName: updateName,
    updateDesc: updateDesc,
    updateCategory: updateCategory,
    updateHttpRequestable: updateHttpRequestable,
    updateShowInStartlist: updateShowInStartlist,
    resetData
  };
}
