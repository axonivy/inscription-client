import { ConfigDataContext, useConfigDataContext } from '../../../../context';
import { ConfigurationData } from '@axonivy/inscription-protocol';
import { produce } from 'immer';
import { DataUpdater } from '../../../../types/lambda';

export function useConfigurationData(): ConfigDataContext<ConfigurationData> & {
  updateUserConfig: DataUpdater<ConfigurationData['userConfig']>;
  reset: () => void;
} {
  const { setConfig, ...config } = useConfigDataContext();

  const updateUserConfig: DataUpdater<ConfigurationData['userConfig']> = (field, value) => {
    setConfig(
      produce(draft => {
        draft.userConfig[field] = value;
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
    updateUserConfig,
    reset
  };
}
