import { Checkbox, CollapsiblePart } from '../../../../components/widgets';
import { useData } from '../../../../context';

const PersistPart = () => {
  const [, persist, setPersist] = useData('config/persist');

  return (
    <CollapsiblePart collapsibleLabel='Options' defaultOpen={persist}>
      <Checkbox label='Persist task on creation' value={persist} onChange={setPersist} />
    </CollapsiblePart>
  );
};

export default PersistPart;
