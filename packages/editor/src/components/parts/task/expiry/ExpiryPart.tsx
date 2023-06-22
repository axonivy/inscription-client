import { CollapsiblePart, Fieldset, Input } from '../../../../components/widgets';
import ErrorSelect from './../error/ErrorSelect';
import PrioritySelect from './../priority/PrioritySelect';
import ResponsibleSelect from './../responsible/ResponsibleSelect';
import { useExpiryData } from './useExpiryData';

const ExpiryPart = () => {
  const { expiry, updater, updateResponsible, updatePriority } = useExpiryData();
  const isTimeout = expiry.timeout.length > 0;

  return (
    <CollapsiblePart collapsibleLabel='Expiry' defaultOpen={isTimeout}>
      <Fieldset label='Timeout' htmlFor='expiryTimeout'>
        <Input id='expiryTimeout' value={expiry.timeout} onChange={change => updater('timeout', change)} />
      </Fieldset>
      <>
        {isTimeout && (
          <>
            <ErrorSelect error={expiry.error} updateError={change => updater('error', change)} />
            <ResponsibleSelect responsible={expiry.responsible} updateResponsible={updateResponsible} />
            <PrioritySelect priority={expiry.priority} updatePriority={updatePriority} />
          </>
        )}
      </>
    </CollapsiblePart>
  );
};

export default ExpiryPart;
