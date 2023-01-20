import { Checkbox, CollapsiblePart } from '../../../../components/widgets';
import { useTaskPersistData } from './useTaskOptionsData';

const PersistPart = () => {
  const { data, updatePersist } = useTaskPersistData();

  return (
    <CollapsiblePart collapsibleLabel='Options' defaultOpen={data.config.persist}>
      <Checkbox label='Persist task on creation' value={data.config.persist ?? false} onChange={updatePersist} />
    </CollapsiblePart>
  );
};

export default PersistPart;
