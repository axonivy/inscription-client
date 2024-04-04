import { ScriptInput } from '../../../../components/widgets';
import { PathCollapsible, PathFieldset } from '../../common';
import ErrorSelect from './ErrorSelect';
import PrioritySelect from './../priority/PrioritySelect';
import ResponsibleSelect from '../../common/responsible/ResponsibleSelect';
import { useExpiryData } from './useExpiryData';
import { IVY_SCRIPT_TYPES } from '@axonivy/inscription-protocol';

const ExpiryPart = () => {
  const { expiry, defaultExpiry, update, updateResponsible, updatePriority } = useExpiryData();

  return (
    <PathCollapsible label='Expiry' defaultOpen={expiry.timeout.length > 0} path='expiry'>
      <PathFieldset label='Timeout' path='timeout'>
        <ScriptInput
          value={expiry.timeout}
          onChange={change => update('timeout', change)}
          type={IVY_SCRIPT_TYPES.DURATION}
          browsers={['attr', 'func', 'type']}
        />
      </PathFieldset>
      <ErrorSelect value={expiry.error} onChange={change => update('error', change)} />
      <ResponsibleSelect
        responsible={expiry.responsible}
        defaultResponsible={defaultExpiry.responsible}
        updateResponsible={updateResponsible}
      />
      <PrioritySelect priority={expiry.priority} updatePriority={updatePriority} />
    </PathCollapsible>
  );
};

export default ExpiryPart;
