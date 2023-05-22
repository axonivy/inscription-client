import { render, TableUtil, renderHook, screen, DeepPartial } from 'test-utils';
import { ConditionData, ConnectorRef } from '@axonivy/inscription-protocol';
import { PartState } from '../../props';
import { useConditionPart } from './ConditionPart';

const Part = () => {
  const part = useConditionPart();
  return <>{part.content}</>;
};

describe('ConditionPart', () => {
  function renderPart(data?: ConditionData) {
    const connectorOf: Record<string, DeepPartial<ConnectorRef>> = {};
    connectorOf['f1'] = { pid: 'f1', target: { name: 'db', type: { id: 'Database' } } };
    connectorOf['f6'] = { pid: 'f6', target: { name: 'script', type: { id: 'Script' } } };
    connectorOf['f8'] = { pid: 'f8', target: { name: 'end', type: { id: 'TaskEnd' } } };
    render(<Part />, { wrapperProps: { data: data && { config: data }, meta: { connectorOf } } });
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
    expect(await screen.findByText(/db: Database/)).toBeInTheDocument();
    await assertMainPart([/db: Database in.accepted == false/, /script: Script false/, /end: TaskEnd/]);
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
