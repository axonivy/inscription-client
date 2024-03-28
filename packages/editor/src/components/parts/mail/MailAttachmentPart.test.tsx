import type { DeepPartial } from 'test-utils';
import { render, renderHook, screen } from 'test-utils';
import type { MailData } from '@axonivy/inscription-protocol';
import type { PartStateFlag } from '../../editors';
import { useMailAttachmentPart } from './MailAttachmentPart';
import { describe, test, expect } from 'vitest';

const Part = () => {
  const part = useMailAttachmentPart();
  return <>{part.content}</>;
};

describe('MailAttachmentPart', () => {
  function renderPart(data?: DeepPartial<MailData>) {
    render(<Part />, { wrapperProps: { data: data && { config: data } } });
  }

  test('empty data', async () => {
    renderPart();
    expect(screen.queryByRole('table')).toBeNull();
  });

  test('full data', async () => {
    const data: DeepPartial<MailData> = { attachments: ['a1', 'second'] };
    renderPart(data);
    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(2);
  });

  function assertState(expectedState: PartStateFlag, data?: DeepPartial<MailData>) {
    const { result } = renderHook(() => useMailAttachmentPart(), { wrapperProps: { data: data && { config: data } } });
    expect(result.current.state.state).toEqual(expectedState);
  }

  test('configured', async () => {
    assertState(undefined);
    assertState('configured', { attachments: ['s'] });
  });

  test('reset', () => {
    let data = { config: { attachments: ['s', 'bla'] } };
    const view = renderHook(() => useMailAttachmentPart(), {
      wrapperProps: { data, setData: newData => (data = newData), initData: { config: { attachments: ['init'] } } }
    });
    expect(view.result.current.reset.dirty).toEqual(true);

    view.result.current.reset.action();
    expect(data.config.attachments).toEqual(['init']);
  });
});
