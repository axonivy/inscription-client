import type { ConfigDataContext} from '../../../context/index.js';
import { useConfigDataContext } from '../../../context/index.js';
import type { MailData } from '@axonivy/inscription-protocol';
import { produce } from 'immer';
import type { DataUpdater } from '../../../types/lambda.js';

export function useMailData(): ConfigDataContext<MailData> & {
  update: DataUpdater<MailData>;
  updateHeader: DataUpdater<MailData['headers']>;
  resetHeaders: () => void;
  updateMessage: DataUpdater<MailData['message']>;
  resetMessage: () => void;
  resetAttachments: () => void;
} {
  const { setConfig, ...config } = useConfigDataContext();

  const update: DataUpdater<MailData> = (field, value) =>
    setConfig(
      produce((draft: MailData) => {
        draft[field] = value;
      })
    );

  const updateHeader: DataUpdater<MailData['headers']> = (field, value) =>
    setConfig(
      produce(draft => {
        draft.headers[field] = value;
      })
    );

  const resetHeaders = () =>
    setConfig(
      produce(draft => {
        draft.headers = config.initConfig.headers;
        draft.failIfMissingAttachments = config.initConfig.failIfMissingAttachments;
        draft.exceptionHandler = config.initConfig.exceptionHandler;
      })
    );

  const updateMessage: DataUpdater<MailData['message']> = (field, value) =>
    setConfig(
      produce(draft => {
        draft.message[field] = value;
      })
    );

  const resetMessage = () =>
    setConfig(
      produce(draft => {
        draft.message = config.initConfig.message;
      })
    );

  const resetAttachments = () =>
    setConfig(
      produce(draft => {
        draft.attachments = config.initConfig.attachments;
      })
    );

  return {
    ...config,
    update,
    updateHeader,
    resetHeaders,
    updateMessage,
    resetMessage,
    resetAttachments
  };
}
