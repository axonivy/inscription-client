import { DeepPartial, render, renderHook, screen } from 'test-utils';
import { MailHeaderData } from '@axonivy/inscription-protocol';
import { PartState } from '../../props';
import { useMailHeaderPart } from './MailHeaderPart';

const Part = () => {
  const part = useMailHeaderPart();
  return <>{part.content}</>;
};

describe('EndPagePart', () => {
  function renderPart(data?: MailHeaderData) {
    render(<Part />, { wrapperProps: { data: data && { config: data } } });
  }

  async function assertPage(data?: MailHeaderData) {
    expect(await screen.findByLabelText('Subject')).toHaveValue(data?.headers.subject ?? '');
    expect(await screen.findByLabelText('From')).toHaveValue(data?.headers.from ?? '');
    expect(await screen.findByLabelText('Reply to')).toHaveValue(data?.headers.replyTo ?? '');
    expect(await screen.findByLabelText('To')).toHaveValue(data?.headers.to ?? '');
    expect(await screen.findByLabelText('CC')).toHaveValue(data?.headers.cc ?? '');
    expect(await screen.findByLabelText('BCC')).toHaveValue(data?.headers.bcc ?? '');
  }

  test('empty data', async () => {
    renderPart();
    await assertPage();
  });

  test('full data', async () => {
    const data: MailHeaderData = { headers: { subject: 'sub', from: 'from', replyTo: 'reply', to: 'to', cc: 'cc', bcc: 'bcc' } };
    renderPart(data);
    await assertPage(data);
  });

  function assertState(expectedState: PartState, data?: DeepPartial<MailHeaderData>) {
    const { result } = renderHook(() => useMailHeaderPart(), { wrapperProps: { data: data && { config: data } } });
    expect(result.current.state).toEqual(expectedState);
  }

  test('configured', async () => {
    assertState('empty');
    assertState('configured', { headers: { subject: 's' } });
    assertState('configured', { headers: { from: 's' } });
    assertState('configured', { headers: { to: 's' } });
    assertState('configured', { headers: { replyTo: 's' } });
    assertState('configured', { headers: { cc: 's' } });
    assertState('configured', { headers: { bcc: 's' } });
  });

  test('reset', () => {
    let data = { config: { headers: { subject: 'sub', from: 'from', replyTo: 'reply', to: 'to', cc: 'cc', bcc: 'bcc' } } };
    const view = renderHook(() => useMailHeaderPart(), {
      wrapperProps: { data, setData: newData => (data = newData), initData: { config: { headers: { subject: 'init' } } } }
    });
    expect(view.result.current.reset?.dirty).toEqual(true);

    view.result.current.reset?.action();
    expect(data.config.headers.subject).toEqual('init');
    expect(data.config.headers.from).toEqual('');
    expect(data.config.headers.replyTo).toEqual('');
    expect(data.config.headers.cc).toEqual('');
    expect(data.config.headers.bcc).toEqual('');
    expect(data.config.headers.to).toEqual('');
  });
});
