import { CollapsiblePart, LabelInput } from '../../../components/widgets';
import { useReadonly } from '../../../context';
import ErrorSelect from './error/ErrorSelect';
import PrioritySelect from './priority/PrioritySelect';
import ResponsibleSelect from './responsible/ResponsibleSelect';
import { useExpiryData } from './useExpiryData';

const ExpiryPart = () => {
  const { task, updateTimeout } = useExpiryData();
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
            <ResponsibleSelect expiry={true} />
            <PrioritySelect expiry={true} />
          </>
        )}
      </>
    </CollapsiblePart>
  );
};

export default ExpiryPart;
