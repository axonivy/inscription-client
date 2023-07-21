import { renderHook, screen, render, DeepPartial, cloneObject } from 'test-utils';
import { WfTask, TaskData, DEFAULT_TASK } from '@axonivy/inscription-protocol';
import { useSingleTaskPart } from './SingleTaskPart';
import { PartStateFlag } from '../../editors';

const Part = () => {
  const part = useSingleTaskPart();
  return <>{part.content}</>;
};

describe('SingleTaskPart', () => {
  function renderEmptyPart() {
    //@ts-ignore
    render(<Part />, { wrapperProps: { defaultData: { task: undefined } } });
  }

  function assertState(expectedState: PartStateFlag, task?: DeepPartial<WfTask>, taskData?: Partial<TaskData>, showPersist?: boolean) {
    let data = taskData ? { config: taskData } : task ? { config: { task } } : undefined;
    const { result } = renderHook(() => useSingleTaskPart({ showPersist }), { wrapperProps: { data } });
    expect(result.current.state.state).toEqual(expectedState);
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

  test('reset', () => {
    let data: any = {
      config: {
        task: {
          name: 'name',
          description: 'desc',
          category: 'cat',
          responsible: { type: 'ROLE_FROM_ATTRIBUTE', activator: '' },
          priority: { level: 'LOW', script: '' },
          skipTasklist: true,
          delay: 'delay',
          persist: true,
          expiry: { timeout: 'asf' },
          customFields: [{ name: 'cf', type: 'NUMBER', value: '123' }],
          code: 'code'
        }
      }
    };
    const view = renderHook(() => useSingleTaskPart(), {
      wrapperProps: { data, setData: newData => (data = newData), initData: { config: { task: { name: 'init' } } } }
    });
    expect(view.result.current.reset.dirty).toEqual(true);

    view.result.current.reset.action();
    const expectedTask = cloneObject(DEFAULT_TASK);
    expectedTask.name = 'init';
    expect(data.config.task).toEqual(expectedTask);
  });
});
