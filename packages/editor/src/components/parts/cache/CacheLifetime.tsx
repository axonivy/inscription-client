import type { PathCollapsibleProps } from '../common';
import { PathCollapsible, PathFieldset } from '../common';
import { Radio, ScriptInput } from '../../../components/widgets';
import type { CacheArtifact, CacheMode } from '@axonivy/inscription-protocol';
import { IVY_SCRIPT_TYPES } from '@axonivy/inscription-protocol';
import type { DataUpdater } from '../../../types/lambda';

type CacheLifetimeProps = Omit<PathCollapsibleProps, 'children'> & {
  description: string;
  config: CacheArtifact;
  updater: DataUpdater<CacheArtifact>;
  cacheMode: CacheMode;
};

export const CacheLifetime = ({ description, config, updater, cacheMode, ...props }: CacheLifetimeProps) => {
  return (
    <PathCollapsible defaultOpen={true} {...props}>
      <PathFieldset label='Name' title={description} path='name'>
        <ScriptInput
          value={config.name}
          onChange={change => updater('name', change)}
          type={IVY_SCRIPT_TYPES.STRING}
          browsers={['attr', 'func', 'type', 'cms']}
        />
      </PathFieldset>
      {cacheMode === 'CACHE' && (
        <PathFieldset label='Lifetime' path='time'>
          <Radio
            value={config.invalidation}
            onChange={change => updater('invalidation', change)}
            items={[
              { label: 'Forever', value: 'NONE' },
              { label: 'Fixed time', value: 'FIXED_TIME' },
              { label: 'Duration', value: 'LIFETIME' }
            ]}
            orientation='horizontal'
          />
          {config.invalidation !== 'NONE' && (
            <ScriptInput
              value={config.time}
              onChange={change => updater('time', change)}
              type={config.invalidation === 'FIXED_TIME' ? IVY_SCRIPT_TYPES.TIME : IVY_SCRIPT_TYPES.NUMBER}
              browsers={['attr', 'func', 'type', 'cms']}
            />
          )}
        </PathFieldset>
      )}
    </PathCollapsible>
  );
};
