import { useConfigDataContext } from '../../../context';
import { MailHeaderData } from '@axonivy/inscription-protocol';
import { produce } from 'immer';
import { useCallback } from 'react';

export function useMailHeaderData(): {
  data: MailHeaderData;
  initData: MailHeaderData;
  defaultData: MailHeaderData;
  updater: <TField extends keyof MailHeaderData['headers']>(field: TField, value: MailHeaderData['headers'][TField]) => void;
  resetData: () => void;
} {
  const { config, defaultConfig, initConfig, setConfig } = useConfigDataContext();

  const updater = <TField extends keyof MailHeaderData['headers']>(field: TField, value: MailHeaderData['headers'][TField]) => {
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
