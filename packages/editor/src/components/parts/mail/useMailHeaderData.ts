import { useConfigDataContext } from '../../../context';
import { MailHeaderData } from '@axonivy/inscription-protocol';
import { produce } from 'immer';
import { useCallback } from 'react';
import { Updater } from '../../../types/lambda';

export function useMailHeaderData(): {
  data: MailHeaderData;
  initData: MailHeaderData;
  defaultData: MailHeaderData;
  updater: Updater<MailHeaderData['headers']>;
  resetData: () => void;
} {
  const { config, defaultConfig, initConfig, setConfig } = useConfigDataContext();

  const updater: Updater<MailHeaderData['headers']> = (field, value) => {
    setConfig(
      produce(draft => {
        draft.headers[field] = value;
      })
    );
  };

  const resetData = useCallback(
    () =>
      setConfig(
        produce(draft => {
          draft.headers = initConfig.headers;
        })
      ),
    [setConfig, initConfig]
  );

  return {
    data: config,
    initData: initConfig,
    defaultData: defaultConfig,
    updater,
    resetData
  };
}
