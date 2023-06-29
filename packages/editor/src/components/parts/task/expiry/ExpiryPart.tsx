import { CollapsiblePart, Fieldset, Input, useFieldset } from '../../../../components/widgets';
import ErrorSelect from './../error/ErrorSelect';
import PrioritySelect from './../priority/PrioritySelect';
import ResponsibleSelect from './../responsible/ResponsibleSelect';
import { useExpiryData } from './useExpiryData';

const ExpiryPart = () => {
  const { expiry, update, updateResponsible, updatePriority } = useExpiryData();
  const isTimeout = expiry.timeout.length > 0;
  const timeoutFieldset = useFieldset();

  return (
    <CollapsiblePart collapsibleLabel='Expiry' defaultOpen={isTimeout}>
      <Fieldset label='Timeout' {...timeoutFieldset.labelProps}>
        <Input value={expiry.timeout} onChange={change => update('timeout', change)} {...timeoutFieldset.inputProps} />
      </Fieldset>
      <>
        {isTimeout && (
          <>
            <ErrorSelect error={expiry.error} updateError={change => update('error', change)} />
            <ResponsibleSelect responsible={expiry.responsible} updateResponsible={updateResponsible} />
            <PrioritySelect priority={expiry.priority} updatePriority={updatePriority} />
          </>
        )}
      </>
    </CollapsiblePart>
  );
};

export default ExpiryPart;
