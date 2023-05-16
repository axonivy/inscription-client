import { Checkbox, CollapsiblePart } from '../../../../components/widgets';
import { useTaskPersistData } from './useTaskOptionsData';

const PersistPart = () => {
  const { persistData, updatePersist } = useTaskPersistData();

  return (
    <CollapsiblePart collapsibleLabel='Options' defaultOpen={persistData.persist}>
      <Checkbox label='Persist task on creation' value={persistData.persist} onChange={updatePersist} />
    </CollapsiblePart>
  );
};

export default PersistPart;
