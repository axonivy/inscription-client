import { useDataContext } from '../../../context';
import { Mapping, OutputData } from '@axonivy/inscription-protocol';
import produce from 'immer';
import { useCallback } from 'react';
import { Consumer } from '../../../types/lambda';

export function useOutputData(): {
  data: OutputData;
  updateMap: Consumer<Mapping[]>;
  updateCode: Consumer<string>;
  updateSudo: Consumer<boolean>;
} {
  const { data, setData } = useDataContext();

  const updateMap = useCallback<Consumer<Mapping[]>>(
    map =>
      setData(
        produce<OutputData>(draft => {
          if (!draft.config.output) {
            draft.config.output = {};
          }
          draft.config.output.map = map;
        })
      ),
    [setData]
  );

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

  return { data, updateMap, updateCode, updateSudo };
}
