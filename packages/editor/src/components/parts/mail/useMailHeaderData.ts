import { ConfigDataContext, useConfigDataContext } from '../../../context';
import { MailHeaderData } from '@axonivy/inscription-protocol';
import { produce } from 'immer';
import { DataUpdater } from '../../../types/lambda';

export function useMailHeaderData(): ConfigDataContext<MailHeaderData> & {
  update: DataUpdater<MailHeaderData['headers']>;
  resetData: () => void;
} {
  const { setConfig, ...config } = useConfigDataContext();

  const update: DataUpdater<MailHeaderData['headers']> = (field, value) => {
    setConfig(
      produce(draft => {
        draft.headers[field] = value;
      })
    );
  };

  const resetData = () =>
    setConfig(
      produce(draft => {
        draft.headers = config.initConfig.headers;
      })
    );

  return {
    ...config,
    update,
    resetData
  };
}
