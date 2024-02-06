import { PathContext } from '../../../../context';
import { MacroArea } from '../../../../components/widgets';
import { PathCollapsible, ValidationFieldset } from '../../common';
import { useQueryData } from '../useQueryData';

export const Condition = () => {
  const { config, defaultConfig, updateSql } = useQueryData();
  return (
    <PathContext path='sql'>
      <PathCollapsible label='Condition' defaultOpen={config.query.sql.condition !== defaultConfig.query.sql.condition} path='condition'>
        <ValidationFieldset>
          <MacroArea
            value={config.query.sql.condition}
            onChange={change => updateSql('condition', change)}
            browsers={['tablecol', 'attr']}
          />
        </ValidationFieldset>
      </PathCollapsible>
    </PathContext>
  );
};
