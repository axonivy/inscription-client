import { render, TableUtil, renderHook } from 'test-utils';
import { ConditionData } from '@axonivy/inscription-protocol';
import { PartState } from '../../props';
import { useConditionPart } from './ConditionPart';

const Part = () => {
  const part = useConditionPart();
  return <>{part.content}</>;
};

describe('ConditionPart', () => {
  function renderPart(data?: ConditionData) {
    render(<Part />, { wrapperProps: { data: data && { config: data } } });
  }

  async function assertMainPart(map: RegExp[]) {
    TableUtil.assertRows(map);
  }

  test('empty data', async () => {
    renderPart();
    await assertMainPart([]);
  });

  test('full data', async () => {
    const conditions: ConditionData = {
      conditions: {
        f1: 'in.accepted == false',
        f6: 'false',
        f8: ''
      }
    };
    renderPart(conditions);
    await assertMainPart([/f1: TaskEnd in.accepted == false/, /f6: TaskEnd false/, /f8: TaskEnd/]);
  });

  function assertState(expectedState: PartState, data?: Partial<ConditionData>) {
    const { result } = renderHook(() => useConditionPart(), { wrapperProps: { data: data && { config: data } } });
    expect(result.current.state).toEqual(expectedState);
  }

  test('configured', async () => {
    assertState('empty');
    assertState('configured', { conditions: { f1: 'false' } });
  });
});
