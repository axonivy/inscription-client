import type { PathCollapsibleProps } from '../common/index.js';
import { PathCollapsible, PathFieldset } from '../common/index.js';
import { Radio, ScriptInput, useFieldset } from '../../../components/widgets/index.js';
import type { CacheArtifact, CacheMode } from '@axonivy/inscription-protocol';
import { IVY_SCRIPT_TYPES } from '@axonivy/inscription-protocol';
import type { DataUpdater } from '../../../types/lambda.js';

type CacheLifetimeProps = Omit<PathCollapsibleProps, 'children'> & {
  description: string;
  config: CacheArtifact;
  updater: DataUpdater<CacheArtifact>;
  cacheMode: CacheMode;
};

export const CacheLifetime = ({ description, config, updater, cacheMode, ...props }: CacheLifetimeProps) => {
  const cacheLifetimeFieldset = useFieldset();
  const timeFieldset = useFieldset();

  return (
    <PathCollapsible defaultOpen={true} {...props}>
      <PathFieldset label='Name' title={description} path='name' {...cacheLifetimeFieldset.labelProps}>
        <ScriptInput
          value={config.name}
          onChange={change => updater('name', change)}
          type={IVY_SCRIPT_TYPES.STRING}
          browsers={['attr', 'func', 'type', 'cms']}
          {...cacheLifetimeFieldset.inputProps}
        />
      </PathFieldset>
      {cacheMode === 'CACHE' && (
        <PathFieldset label='Lifetime' path='time' {...timeFieldset.labelProps}>
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
              {...timeFieldset.inputProps}
            />
          )}
        </PathFieldset>
      )}
    </PathCollapsible>
  );
};
