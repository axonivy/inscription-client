import { ScriptInput, useFieldset } from '../../../../components/widgets';
import { PathCollapsible } from '../../common/path/PathCollapsible';
import { PathFieldset } from '../../common/path/PathFieldset';
import ErrorSelect from './ErrorSelect';
import PrioritySelect from './../priority/PrioritySelect';
import ResponsibleSelect from './../responsible/ResponsibleSelect';
import { useExpiryData } from './useExpiryData';

const ExpiryPart = () => {
  const { expiry, update, updateResponsible, updatePriority } = useExpiryData();
  const isTimeout = expiry.timeout.length > 0;
  const timeoutFieldset = useFieldset();

  return (
    <PathCollapsible label='Expiry' defaultOpen={isTimeout} path='expiry'>
      <PathFieldset label='Timeout' {...timeoutFieldset.labelProps} path='timeout'>
        <ScriptInput
          value={expiry.timeout}
          onChange={change => update('timeout', change)}
          type='Duration'
          {...timeoutFieldset.inputProps}
        />
      </PathFieldset>
      <>
        {isTimeout && (
          <>
            <ErrorSelect value={expiry.error} onChange={change => update('error', change)} />
            <ResponsibleSelect responsible={expiry.responsible} updateResponsible={updateResponsible} />
            <PrioritySelect priority={expiry.priority} updatePriority={updatePriority} />
          </>
        )}
      </>
    </PathCollapsible>
  );
};

export default ExpiryPart;
