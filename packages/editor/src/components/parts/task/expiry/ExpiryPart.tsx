import { ScriptInput } from '../../../../components/widgets';
import { PathCollapsible, PathFieldset } from '../../common';
import ErrorSelect from './ErrorSelect';
import PrioritySelect from './../priority/PrioritySelect';
import ResponsibleSelect from '../../common/responsible/ResponsibleSelect';
import { useExpiryData } from './useExpiryData';
import { IVY_SCRIPT_TYPES } from '@axonivy/inscription-protocol';

const ExpiryPart = () => {
  const { expiry, update, updateResponsible, updatePriority } = useExpiryData();
  const isTimeout = expiry.timeout.length > 0;

  return (
    <PathCollapsible label='Expiry' defaultOpen={isTimeout} path='expiry'>
      <PathFieldset label='Timeout' path='timeout'>
        <ScriptInput
          value={expiry.timeout}
          onChange={change => update('timeout', change)}
          type={IVY_SCRIPT_TYPES.DURATION}
          browsers={['attr', 'func', 'type']}
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
