import { ConfigDataContext, useConfigDataContext } from '../../../../context';
import { EditorData } from '@axonivy/inscription-protocol';
import { produce } from 'immer';
import { DataUpdater } from '../../../../types/lambda';

export function useEditorData(): ConfigDataContext<EditorData> & {
  update: DataUpdater<EditorData>;
  reset: () => void;
} {
  const { setConfig, ...config } = useConfigDataContext();

  const update: DataUpdater<EditorData> = (field, value) => {
    setConfig(
      produce((draft: EditorData) => {
        draft[field] = value;
      })
    );
  };

  const reset = () =>
    setConfig(
      produce(draft => {
        draft.userConfig = config.initConfig.userConfig;
      })
    );

  return {
    ...config,
    update,
    reset
  };
}
