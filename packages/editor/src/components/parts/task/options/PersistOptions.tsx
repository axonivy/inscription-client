import { Checkbox, Collapsible } from '../../../widgets/index.js';
import { useTaskPersistData } from './usePersistOptionsData.js';

const PersistOptions = () => {
  const { config, updatePersist } = useTaskPersistData();
  const disabled = config.permission.anonymous;

  return (
    <Collapsible label='Options' defaultOpen={config.persistOnStart}>
      <Checkbox
        label={`Persist task on creation${disabled ? ' (Only works if anonymous users are not allowed)' : ''}`}
        value={config.persistOnStart}
        onChange={updatePersist}
        disabled={disabled}
      />
    </Collapsible>
  );
};

export default PersistOptions;
