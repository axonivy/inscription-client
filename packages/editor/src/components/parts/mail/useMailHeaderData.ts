import { useConfigDataContext } from '../../../context';
import { MailHeaderData } from '@axonivy/inscription-protocol';
import { produce } from 'immer';
import { useCallback } from 'react';
import { Consumer } from '../../../types/lambda';

export function useMailHeaderData(): {
  data: MailHeaderData;
  initData: MailHeaderData;
  defaultData: MailHeaderData;
  updateSubject: Consumer<string>;
  updateFrom: Consumer<string>;
  updateReplyTo: Consumer<string>;
  updateTo: Consumer<string>;
  updateCc: Consumer<string>;
  updateBcc: Consumer<string>;
  resetData: () => void;
} {
  const { config, defaultConfig, initConfig, setConfig } = useConfigDataContext();

  const updateSubject = useCallback<Consumer<string>>(
    subject =>
      setConfig(
        produce(draft => {
          draft.headers.subject = subject;
        })
      ),
    [setConfig]
  );

  const updateFrom = useCallback<Consumer<string>>(
    from =>
      setConfig(
        produce(draft => {
          draft.headers.from = from;
        })
      ),
    [setConfig]
  );

  const updateReplyTo = useCallback<Consumer<string>>(
    replyTo =>
      setConfig(
        produce(draft => {
          draft.headers.replyTo = replyTo;
        })
      ),
    [setConfig]
  );

  const updateTo = useCallback<Consumer<string>>(
    to =>
      setConfig(
        produce(draft => {
          draft.headers.to = to;
        })
      ),
    [setConfig]
  );

  const updateCc = useCallback<Consumer<string>>(
    cc =>
      setConfig(
        produce(draft => {
          draft.headers.cc = cc;
        })
      ),
    [setConfig]
  );

  const updateBcc = useCallback<Consumer<string>>(
    bcc =>
      setConfig(
        produce(draft => {
          draft.headers.bcc = bcc;
        })
      ),
    [setConfig]
  );

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
    updateSubject,
    updateFrom,
    updateReplyTo,
    updateTo,
    updateCc,
    updateBcc,
    resetData
  };
}
