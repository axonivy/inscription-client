import { useDataContext } from '../../../context';
import { OutputData } from '@axonivy/inscription-protocol';
import produce from 'immer';
import { useCallback } from 'react';
import { Consumer } from '../../../types/lambda';

export function useOutputData(): {
  data: OutputData;
  updateCode: Consumer<string>;
  updateSudo: Consumer<boolean>;
} {
  const { data, setData } = useDataContext();

  const updateCode = useCallback<Consumer<string>>(
    code =>
      setData(
        produce<OutputData>(draft => {
          if (!draft.config.output) {
            draft.config.output = {};
          }
          draft.config.output.code = code;
        })
      ),
    [setData]
  );

  const updateSudo = useCallback<Consumer<boolean>>(
    sudo =>
      setData(
        produce<OutputData>(draft => {
          draft.config.sudo = sudo;
        })
      ),
    [setData]
  );

  return { data, updateCode, updateSudo };
}
