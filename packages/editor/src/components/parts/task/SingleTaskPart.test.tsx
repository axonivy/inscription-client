import { renderHook, screen, render } from 'test-utils';
import { WfTask, TaskData } from '@axonivy/inscription-protocol';
import { useSingleTaskPart } from './SingleTaskPart';
import { PartState } from '../../props';
import { DeepPartial } from '../../../types/types';

const Part = () => {
  const part = useSingleTaskPart();
  return <>{part.content}</>;
};

describe('SingleTaskPart', () => {
  function renderEmptyPart() {
    //@ts-ignore
    render(<Part />, { wrapperProps: { defaultData: { task: undefined } } });
  }

  function assertState(expectedState: PartState, task?: DeepPartial<WfTask>, taskData?: Partial<TaskData>, showPersist?: boolean) {
    let data = taskData ? { config: taskData } : task ? { config: { task } } : undefined;
    const { result } = renderHook(() => useSingleTaskPart({ showPersist }), { wrapperProps: { data } });
    expect(result.current.state).toEqual(expectedState);
  }

  test('empty data', async () => {
    renderEmptyPart();
    expect(screen.getByText('There is no (Task) output flow connected.')).toBeInTheDocument();
  });

  test('configured', async () => {
    assertState('empty');
    assertState('configured', { name: 'name' });
    assertState('configured', { description: 'desc' });
    assertState('configured', { category: 'cat' });
    assertState('configured', { responsible: { type: 'ROLE_FROM_ATTRIBUTE', activator: '' } });
    assertState('configured', { priority: { level: 'LOW', script: '' } });

    assertState('configured', { skipTasklist: true });
    assertState('configured', { delay: 'delay' });
    assertState('configured', undefined, { persist: true }, true);

    assertState('configured', { expiry: { timeout: 'asf' } });

    assertState('configured', { customFields: [{ name: 'cf', type: 'NUMBER', value: '123' }] });
    assertState('configured', { code: 'code' });
  });
});
