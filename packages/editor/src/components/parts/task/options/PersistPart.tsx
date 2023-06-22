import { Checkbox, CollapsiblePart } from '../../../../components/widgets';
import { useTaskPersistData } from './useTaskOptionsData';

const PersistPart = () => {
  const { config, updatePersist } = useTaskPersistData();

  return (
    <CollapsiblePart collapsibleLabel='Options' defaultOpen={config.persist}>
      <Checkbox label='Persist task on creation' value={config.persist} onChange={updatePersist} />
    </CollapsiblePart>
  );
};

export default PersistPart;
