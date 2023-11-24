import { PathContext } from '../../../../context/index.js';
import { MacroArea } from '../../../../components/widgets/index.js';
import { PathCollapsible, ValidationFieldset } from '../../common/index.js';
import { useQueryData } from '../useQueryData.js';

export const Condition = () => {
  const { config, defaultConfig, updateSql } = useQueryData();
  return (
    <PathContext path='sql'>
      <PathCollapsible label='Condition' defaultOpen={config.query.sql.condition !== defaultConfig.query.sql.condition} path='condition'>
        <ValidationFieldset>
          <MacroArea
            value={config.query.sql.condition}
            onChange={change => updateSql('condition', change)}
            browsers={['tablecol', 'sqlOp', 'attr']}
          />
        </ValidationFieldset>
      </PathCollapsible>
    </PathContext>
  );
};
