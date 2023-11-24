import { MacroArea } from '../../../../../components/widgets/index.js';
import { useRestRequestData } from '../../useRestRequestData.js';
import { PathContext } from '../../../../../context/index.js';
import { ValidationFieldset } from '../../../../../components/parts/common/index.js';

export const RestBodyRaw = () => {
  const { config, updateBody } = useRestRequestData();
  return (
    <PathContext path='raw'>
      <ValidationFieldset>
        <MacroArea value={config.body.raw} onChange={change => updateBody('raw', change)} browsers={['attr', 'func', 'cms']} />
      </ValidationFieldset>
    </PathContext>
  );
};
