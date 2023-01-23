import { CollapsiblePart, LabelInput } from '../../../../components/widgets';
import { useReadonly } from '../../../../context';
import ErrorSelect from './../error/ErrorSelect';
import PrioritySelect from './../priority/PrioritySelect';
import ResponsibleSelect from './../responsible/ResponsibleSelect';
import { useExpiryData } from './useExpiryData';

const ExpiryPart = () => {
  const { task, updateTimeout, updateResponsible, updatePriority } = useExpiryData();
  const isTimeout = task.expiry?.timeout !== undefined && task.expiry.timeout.length > 0;
  const readonly = useReadonly();

  return (
    <CollapsiblePart collapsibleLabel='Expiry' defaultOpen={isTimeout}>
      <LabelInput label='Timeout' htmlFor='timeout'>
        <input
          className='input'
          id='timeout'
          value={task.expiry?.timeout ?? ''}
          onChange={event => updateTimeout(event.target.value)}
          disabled={readonly}
        />
      </LabelInput>
      <>
        {isTimeout && (
          <>
            <ErrorSelect />
            <ResponsibleSelect responsible={task.expiry?.responsible} updateResponsible={updateResponsible} />
            <PrioritySelect priority={task.priority} updatePriority={updatePriority} />
          </>
        )}
      </>
    </CollapsiblePart>
  );
};

export default ExpiryPart;
