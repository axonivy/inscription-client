import type { DeepPartial} from 'test-utils';
import { TableUtil, render, renderHook } from 'test-utils';
import type { MailData } from '@axonivy/inscription-protocol';
import type { PartStateFlag } from '../../editors';
import { useMailAttachmentPart } from './MailAttachmentPart';

const Part = () => {
  const part = useMailAttachmentPart();
  return <>{part.content}</>;
};

describe('MailAttachmentPart', () => {
  function renderPart(data?: DeepPartial<MailData>) {
    render(<Part />, { wrapperProps: { data: data && { config: data } } });
  }

  async function assertPage(data?: DeepPartial<MailData>) {
    TableUtil.assertRows(data?.attachments ?? []);
  }

  test('empty data', async () => {
    renderPart();
    await assertPage();
  });

  test('full data', async () => {
    const data: DeepPartial<MailData> = { attachments: ['a1', 'second'] };
    renderPart(data);
    await assertPage(data);
  });

  function assertState(expectedState: PartStateFlag, data?: DeepPartial<MailData>) {
    const { result } = renderHook(() => useMailAttachmentPart(), { wrapperProps: { data: data && { config: data } } });
    expect(result.current.state.state).toEqual(expectedState);
  }

  test('configured', async () => {
    assertState('empty');
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
