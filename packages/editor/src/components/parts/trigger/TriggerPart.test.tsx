import type { DeepPartial } from 'test-utils';
import { render, screen, renderHook, CollapsableUtil, SelectUtil } from 'test-utils';
import type { ElementData, InscriptionValidation, TriggerData } from '@axonivy/inscription-protocol';
import { useTriggerPart } from './TriggerPart';
import type { PartStateFlag } from '../../editors';
import { describe, test, expect } from 'vitest';

const Part = () => {
  const part = useTriggerPart();
  return <>{part.content}</>;
};

describe('TriggerPart', () => {
  function renderPart(data?: DeepPartial<TriggerData>) {
    render(<Part />, { wrapperProps: { data: data && { config: data } } });
  }

  async function assertMainPart(triggerable: boolean, responsible: string, delay: string) {
    const triggerCheckbox = screen.getByLabelText('Yes, this can be started with a Trigger Activity');
    if (triggerable) {
      expect(triggerCheckbox).toBeChecked();
      await SelectUtil.assertValue(responsible, { index: 0 });
      await CollapsableUtil.assertOpen('Options');
      expect(screen.getByLabelText('Attach to Business Case that triggered this process')).toBeChecked();
      expect(screen.getByLabelText('Delay')).toHaveValue(delay);
    } else {
      expect(triggerCheckbox).not.toBeChecked();
    }
  }

  test('empty data', async () => {
    renderPart();
    await assertMainPart(false, '', '');
  });

  test('no task', async () => {
    renderPart({ task: undefined });
    await assertMainPart(false, '', '');
  });

  test('full data', async () => {
    const triggerData: DeepPartial<TriggerData> = {
      triggerable: true,
      task: {
        delay: 'test',
        responsible: {
          type: 'ROLE_FROM_ATTRIBUTE',
          activator: 'Test'
        }
      },
      case: {
        attachToBusinessCase: true
      }
    };
    renderPart(triggerData);
    await assertMainPart(true, 'Role from Attr.', 'test');
  });

  function assertState(expectedState: PartStateFlag, data?: DeepPartial<TriggerData>, validation?: InscriptionValidation) {
    const { result } = renderHook(() => useTriggerPart(), {
      wrapperProps: { data: data && { config: data }, validations: validation && [validation] }
    });
    expect(result.current.state.state).toEqual(expectedState);
  }

  test('configured', async () => {
    assertState(undefined);
    assertState('configured', { triggerable: true });

    assertState(undefined, undefined, { path: 'task.name', message: '', severity: 'ERROR' });
    assertState('error', undefined, { path: 'task.delay', message: '', severity: 'ERROR' });
    assertState('warning', undefined, { path: 'task.responsible', message: '', severity: 'WARNING' });
  });

  test('reset', () => {
    let data: DeepPartial<ElementData> = {
      config: {
        triggerable: true,
        task: {
          delay: 'test',
          responsible: {
            type: 'ROLE_FROM_ATTRIBUTE',
            activator: 'Test'
          }
        },
        case: {
          attachToBusinessCase: false
        }
      }
    };
    const view = renderHook(() => useTriggerPart(), {
      wrapperProps: { data, setData: newData => (data = newData), initData: { config: { triggerable: true, task: { delay: 'init' } } } }
    });
    expect(view.result.current.reset.dirty).toEqual(true);

    view.result.current.reset.action();
    expect(data.config?.triggerable).toEqual(true);
    expect(data.config?.task?.delay).toEqual('init');
    expect(data.config?.task?.responsible?.type).toEqual('ROLE');
    expect(data.config?.task?.responsible?.activator).toEqual('Everybody');
    expect(data.config?.case?.attachToBusinessCase).toEqual(true);
  });
});
