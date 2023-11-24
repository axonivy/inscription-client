import type { DeepPartial} from 'test-utils';
import { CollapsableUtil, SelectUtil, render, renderHook, screen } from 'test-utils';
import type { ElementData, EventData, InscriptionValidation } from '@axonivy/inscription-protocol';
import type { PartStateFlag } from '../../../editors/index.js';
import { useEventPart } from './EventPart.js';

const Part = () => {
  const part = useEventPart();
  return <>{part.content}</>;
};

describe('EventPart', () => {
  function renderPart(data?: DeepPartial<EventData>) {
    render(<Part />, {
      wrapperProps: { data: data && { config: data } }
    });
  }

  test('empty data', async () => {
    renderPart();
    expect(screen.getByLabelText('Event ID')).toBeInTheDocument();
    await CollapsableUtil.assertClosed('Expiry');
  });

  test('full data', async () => {
    renderPart({
      javaClass: 'Test',
      eventId: '123',
      timeout: {
        error: 'ivy:error:program:timeout',
        action: 'DESTROY_TASK',
        duration: '456'
      }
    });
    expect(screen.getByLabelText('Java Class')).toHaveValue('Test');
    expect(screen.getByLabelText('Event ID')).toHaveValue('123');
    await CollapsableUtil.assertOpen('Expiry');
    await SelectUtil.assertValue('ivy:error:program:timeout', { index: 1 });
    expect(screen.getByLabelText('Duration')).toHaveValue('456');
    expect(screen.getByRole('radio', { name: 'Do nothing' })).not.toBeChecked();
    expect(screen.getByRole('radio', { name: 'Delete the Task' })).toBeChecked();
  });

  function assertState(expectedState: PartStateFlag, data?: DeepPartial<EventData>, validation?: InscriptionValidation) {
    const { result } = renderHook(() => useEventPart(), {
      wrapperProps: { data: data && { config: data }, validations: validation && [validation] }
    });
    expect(result.current.state.state).toEqual(expectedState);
  }

  test('configured', async () => {
    assertState('empty');
    assertState('configured', { javaClass: 'Bla' });
    assertState('configured', { eventId: '123' });
    assertState('configured', { timeout: { duration: '123' } });

    assertState('error', undefined, { path: 'javaClass.cause', message: '', severity: 'ERROR' });
    assertState('warning', undefined, { path: 'eventId.error', message: '', severity: 'WARNING' });
    assertState('warning', undefined, { path: 'timeout.error', message: '', severity: 'WARNING' });
  });

  test('reset', () => {
    let data: DeepPartial<ElementData> = {
      config: { javaClass: 'Test', eventId: '123', timeout: { duration: '456' } }
    };
    const view = renderHook(() => useEventPart(), {
      wrapperProps: { data, setData: newData => (data = newData) }
    });
    expect(view.result.current.reset.dirty).toEqual(true);

    view.result.current.reset.action();
    expect(data.config?.javaClass).toEqual('');
    expect(data.config?.eventId).toEqual('');
    expect(data.config?.timeout?.duration).toEqual('');
  });
});
