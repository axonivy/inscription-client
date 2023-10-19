import { ConfigDataContext, useConfigDataContext } from '../../../../context';
import { ConfigurationData } from '@axonivy/inscription-protocol';
import { produce } from 'immer';
import { DataUpdater } from '../../../../types/lambda';

export function useConfigurationData(): ConfigDataContext<ConfigurationData> & {
  update: DataUpdater<ConfigurationData>;
  reset: () => void;
} {
  const { setConfig, ...config } = useConfigDataContext();

  const update: DataUpdater<ConfigurationData> = (field, value) => {
    setConfig(
      produce((draft: ConfigurationData) => {
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
