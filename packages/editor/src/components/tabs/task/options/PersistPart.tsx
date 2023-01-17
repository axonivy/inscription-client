import { Checkbox, CollapsiblePart } from '../../../../components/widgets';
import { useTaskData } from '../../../../context';

const PersistPart = () => {
  const [, persist, setPersist] = useTaskData('config/persist');

  return (
    <CollapsiblePart collapsibleLabel='Options' defaultOpen={persist}>
      <Checkbox label='Persist task on creation' value={persist} onChange={setPersist} />
    </CollapsiblePart>
  );
};

export default PersistPart;
