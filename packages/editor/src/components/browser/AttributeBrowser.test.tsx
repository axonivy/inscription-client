import type { VariableInfo } from '@axonivy/inscription-protocol';
import { TableUtil, render, screen, userEvent } from 'test-utils';
import { useAttributeBrowser } from './AttributeBrowser';
import { describe, test, expect } from 'vitest';
import type { BrowserValue } from './Browser';

const TYPES = {
  'mock.Test': [
    {
      attribute: 'bla',
      type: 'Boolean',
      simpleType: 'Boolean',
      description: ''
    },
    {
      attribute: 'user',
      type: 'workflow.humantask.User',
      simpleType: 'User',
      description: ''
    }
  ],
  'workflow.humantask.User': [
    {
      attribute: 'email',
      type: 'String',
      simpleType: 'String',
      description: ''
    },
    {
      attribute: 'fullName',
      type: 'String',
      simpleType: 'String',
      description: ''
    },
    {
      attribute: 'role',
      type: 'String',
      simpleType: 'String',
      description: ''
    }
  ]
};

const IN_VAR_INFO: VariableInfo = {
  variables: [
    {
      attribute: 'in',
      type: 'mock.Test',
      simpleType: 'Test',
      description: ''
    }
  ],
  types: TYPES
};

const OUT_VAR_INFO: VariableInfo = {
  variables: [
    {
      attribute: 'out',
      type: 'mock.Test',
      simpleType: 'Test',
      description: ''
    }
  ],
  types: TYPES
};

const Browser = (props: { location: string; accept: (value: BrowserValue) => void }) => {
  const browser = useAttributeBrowser(() => {}, props.location);
  return (
    <>
      {browser.content}
      <button data-testid='accept' onClick={() => props.accept(browser.accept())} />
    </>
  );
};

describe('AttributeBrowser', () => {
  function renderBrowser(options?: { location?: string; accept?: (value: BrowserValue) => void }) {
    render(<Browser location={options?.location ?? 'something'} accept={options?.accept ?? (() => {})} />, {
      wrapperProps: { meta: { inScripting: IN_VAR_INFO, outScripting: OUT_VAR_INFO } }
    });
  }

  test('render', async () => {
    renderBrowser();
    TableUtil.assertHeaders(['Attribute']);
    await TableUtil.assertRowCount(4);
  });

  test('render code location', async () => {
    renderBrowser({ location: 'something.code' });
    TableUtil.assertHeaders(['Attribute']);
    await TableUtil.assertRowCount(7);
  });

  test('accept', async () => {
    let data = '';
    renderBrowser({ accept: value => (data = value.cursorValue) });
    await userEvent.click(await screen.findByText('user', { selector: 'span.row-expand-label' }));
    await userEvent.click(screen.getByTestId('accept'));
    expect(data).toEqual('in.user');
  });
});
