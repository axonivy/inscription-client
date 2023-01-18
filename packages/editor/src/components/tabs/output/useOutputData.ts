import { useDataContext } from '../../../context';
import { OutputData } from '@axonivy/inscription-protocol';
import produce from 'immer';
import { useCallback } from 'react';

export function useOutputData(): {
  data: OutputData;
  updateCode: (code: string) => void;
  updateSudo: (sudo: boolean) => void;
} {
  const { data, setData } = useDataContext();

  const updateCode = useCallback(
    (code: string) => {
      setData(
        produce((draft: OutputData) => {
          if (!draft.config.output) {
            draft.config.output = {};
          }
          draft.config.output.code = code;
        })
      );
    },
    [setData]
  );

  const updateSudo = useCallback(
    (sudo: boolean) => {
      setData(
        produce((draft: OutputData) => {
          draft.config.sudo = sudo;
        })
      );
    },
    [setData]
  );

  return { data, updateCode, updateSudo };
}
