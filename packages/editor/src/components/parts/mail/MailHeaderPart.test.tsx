import type { DeepPartial} from 'test-utils';
import { CollapsableUtil, SelectUtil, render, renderHook, screen } from 'test-utils';
import type { MailData } from '@axonivy/inscription-protocol';
import type { PartStateFlag } from '../../editors/index.js';
import { useMailHeaderPart } from './MailHeaderPart.js';

const Part = () => {
  const part = useMailHeaderPart();
  return <>{part.content}</>;
};

describe('MailHeaderPart', () => {
  function renderPart(data?: DeepPartial<MailData>) {
    render(<Part />, { wrapperProps: { data: data && { config: data } } });
  }

  async function assertPage(data?: DeepPartial<MailData>) {
    expect(screen.getByLabelText('Subject')).toHaveValue(data?.headers?.subject ?? '');
    expect(screen.getByLabelText('From')).toHaveValue(data?.headers?.from ?? '');
    expect(screen.getByLabelText('Reply to')).toHaveValue(data?.headers?.replyTo ?? '');
    expect(screen.getByLabelText('To')).toHaveValue(data?.headers?.to ?? '');
    expect(screen.getByLabelText('CC')).toHaveValue(data?.headers?.cc ?? '');
    expect(screen.getByLabelText('BCC')).toHaveValue(data?.headers?.bcc ?? '');
    if (data?.failIfMissingAttachments) {
      await CollapsableUtil.assertOpen('Options');
      await SelectUtil.assertValue('f9');
      expect(screen.getByRole('checkbox')).toBeChecked();
    } else {
      await CollapsableUtil.assertClosed('Options');
    }
  }

  test('empty data', async () => {
    renderPart();
    await assertPage();
  });

  test('full data', async () => {
    const data: DeepPartial<MailData> = {
      headers: { subject: 'sub', from: 'from', replyTo: 'reply', to: 'to', cc: 'cc', bcc: 'bcc' },
      failIfMissingAttachments: true,
      exceptionHandler: 'f9'
    };
    renderPart(data);
    await assertPage(data);
  });

  function assertState(expectedState: PartStateFlag, data?: DeepPartial<MailData>) {
    const { result } = renderHook(() => useMailHeaderPart(), { wrapperProps: { data: data && { config: data } } });
    expect(result.current.state.state).toEqual(expectedState);
  }

  test('configured', async () => {
    assertState('empty');
    assertState('configured', { headers: { subject: 's' } });
    assertState('configured', { headers: { from: 's' } });
    assertState('configured', { headers: { to: 's' } });
    assertState('configured', { headers: { replyTo: 's' } });
    assertState('configured', { headers: { cc: 's' } });
    assertState('configured', { headers: { bcc: 's' } });
    assertState('configured', { failIfMissingAttachments: true });
    assertState('configured', { exceptionHandler: 'hi' });
  });

  test('reset', () => {
    let data = {
      config: {
        headers: { subject: 'sub', from: 'from', replyTo: 'reply', to: 'to', cc: 'cc', bcc: 'bcc' },
        failIfMissingAttachments: true,
        exceptionHandler: 'hi'
      }
    };
    const view = renderHook(() => useMailHeaderPart(), {
      wrapperProps: { data, setData: newData => (data = newData), initData: { config: { headers: { subject: 'init' } } } }
    });
    expect(view.result.current.reset.dirty).toEqual(true);

    view.result.current.reset.action();
    expect(data.config.headers.subject).toEqual('init');
    expect(data.config.headers.from).toEqual('');
    expect(data.config.headers.replyTo).toEqual('');
    expect(data.config.headers.cc).toEqual('');
    expect(data.config.headers.bcc).toEqual('');
    expect(data.config.headers.to).toEqual('');
    expect(data.config.failIfMissingAttachments).toBeFalsy();
    expect(data.config.exceptionHandler).toEqual('');
  });
});
