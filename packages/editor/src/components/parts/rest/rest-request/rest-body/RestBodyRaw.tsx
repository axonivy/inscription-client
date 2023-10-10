import { MacroArea } from '../../../../../components/widgets';
import { useRestRequestData } from '../../useRestRequestData';
import { PathContext } from '../../../../../context';

export const RestBodyRaw = () => {
  const { config, updateBody } = useRestRequestData();
  return (
    <PathContext path='raw'>
      <MacroArea value={config.body.raw} onChange={change => updateBody('raw', change)} />
    </PathContext>
  );
};
