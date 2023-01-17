import { CollapsiblePart, LabelInput } from '../../../components/widgets';
import { useTaskData, useReadonly } from '../../../context';
import ErrorSelect from './error/ErrorSelect';
import PrioritySelect from './priority/PrioritySelect';
import ResponsibleSelect from './responsible/ResponsibleSelect';

const ExpiryPart = () => {
  const [, timeout, setTimeout] = useTaskData('expiry/timeout');
  const isTimeout = timeout?.length > 0;

  const readonly = useReadonly();

  return (
    <CollapsiblePart collapsibleLabel='Expiry' defaultOpen={isTimeout}>
      <LabelInput label='Timeout' htmlFor='timeout'>
        <input
          className='input'
          id='timeout'
          value={timeout ?? ''}
          onChange={event => setTimeout(event.target.value)}
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
