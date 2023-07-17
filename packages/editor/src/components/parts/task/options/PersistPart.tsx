import { Checkbox, Collapsible } from '../../../../components/widgets';
import { useTaskPersistData } from './useTaskOptionsData';

const PersistPart = () => {
  const { config, updatePersist } = useTaskPersistData();

  return (
    <Collapsible label='Options' defaultOpen={config.persist}>
      <Checkbox label='Persist task on creation' value={config.persist} onChange={updatePersist} />
    </Collapsible>
  );
};

export default PersistPart;
