import { MacroArea } from '../../../../components/widgets';
import { PathCollapsible } from '../../common';
import { useQueryData } from '../useQueryData';

export const Condition = () => {
  const { config, defaultConfig, updateSql } = useQueryData();
  return (
    <PathCollapsible label='Condition' defaultOpen={config.query.sql.condition !== defaultConfig.query.sql.condition} path='condition'>
      <MacroArea value={config.query.sql.condition} onChange={change => updateSql('condition', change)} />
    </PathCollapsible>
  );
};
