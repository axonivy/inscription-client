import { useDataContext } from '../../../context';
import { CallData, Mapping } from '@axonivy/inscription-protocol';
import produce from 'immer';
import { useCallback } from 'react';

export function useCallData(): {
  data: CallData;
  updateDialog: (dialog: string) => void;
  updateMap: (map: Mapping[]) => void;
  updateCode: (code: string) => void;
} {
  const { data, setData } = useDataContext();

  const updateDialog = useCallback(
    (dialog: string) => {
      setData(
        produce((draft: CallData) => {
          draft.config.dialog = dialog;
        })
      );
    },
    [setData]
  );

  const updateMap = useCallback(
    (map: Mapping[]) => {
      setData(
        produce((draft: CallData) => {
          if (!draft.config.call) {
            draft.config.call = {};
          }
          draft.config.call.map = map;
        })
      );
    },
    [setData]
  );

  const updateCode = useCallback(
    (code: string) => {
      setData(
        produce((draft: CallData) => {
          if (!draft.config.call) {
            draft.config.call = {};
          }
          draft.config.call.code = code;
        })
      );
    },
    [setData]
  );

  return { data, updateDialog, updateMap, updateCode };
}
