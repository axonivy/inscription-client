import { CollapsiblePart, LabelInput } from '../../../../components/widgets';
import { useReadonly } from '../../../../context';
import ErrorSelect from './../error/ErrorSelect';
import PrioritySelect from './../priority/PrioritySelect';
import ResponsibleSelect from './../responsible/ResponsibleSelect';
import { useExpiryData } from './useExpiryData';

const ExpiryPart = () => {
  const { expiry, updateTimeout, updateError, updateResponsible, updatePriority } = useExpiryData();
  const isTimeout = expiry.timeout.length > 0;
  const readonly = useReadonly();

  return (
    <CollapsiblePart collapsibleLabel='Expiry' defaultOpen={isTimeout}>
      <LabelInput label='Timeout' htmlFor='timeout'>
        <input
          className='input'
          id='timeout'
          value={expiry.timeout}
          onChange={event => updateTimeout(event.target.value)}
          disabled={readonly}
        />
      </LabelInput>
      <>
        {isTimeout && (
          <>
            <ErrorSelect error={expiry.error} updateError={updateError} />
            <ResponsibleSelect responsible={expiry.responsible} updateResponsible={updateResponsible} />
            <PrioritySelect priority={expiry.priority} updatePriority={updatePriority} />
          </>
        )}
      </>
    </CollapsiblePart>
  );
};

export default ExpiryPart;
