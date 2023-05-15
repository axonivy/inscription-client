import { MappingInfo } from '@axonivy/inscription-protocol';
import { Mapping } from '@axonivy/inscription-protocol';
import { render, screen, userEvent } from 'test-utils';
import MappingTree from './MappingTree';

describe('MappingTree', () => {
  const ATTRIBUTES = /Attribute/;
  const PARAMS = /param.procurementRequest/;
  const NODE_PARAMS = /🔵 param.procurementRequest/;
  const NODE_BOOLEAN = /🔵 accepted Boolean/;
  const NODE_NUMBER = /🔵 amount Number/;
  const USER = /requester workflow.humantask.User/;
  const NODE_STRING = /🔵 email String/;

  const mappingInfo: MappingInfo = {
    variables: [
      {
        attribute: 'param.procurementRequest',
        type: 'workflow.humantask.ProcurementRequest',
        simpleType: 'ProcurementRequest'
      }
    ],
    types: {
      'workflow.humantask.ProcurementRequest': [
        {
          attribute: 'accepted',
          type: 'Boolean',
          simpleType: 'Boolean'
        },
        {
          attribute: 'amount',
          type: 'Number',
          simpleType: 'Number'
        },
        {
          attribute: 'requester',
          type: 'workflow.humantask.User',
          simpleType: 'User'
        }
      ],
      'workflow.humantask.User': [
        {
          attribute: 'email',
          type: 'String',
          simpleType: 'String'
        }
      ]
    }
  };

  function renderTree(initData?: Mapping): {
    data: () => Mapping;
  } {
    userEvent.setup();
    let data: Mapping = initData ?? { 'param.procurementRequest': 'in' };
    render(<MappingTree data={data} mappingInfo={mappingInfo} onChange={(change: Mapping) => (data = change)} location='test' />);
    return {
      data: () => data
    };
  }

  function assertTableHeaders(expectedHeaders: string[]) {
    const headers = screen.getAllByRole('columnheader');
    expect(headers).toHaveLength(expectedHeaders.length);
    headers.forEach((header, index) => {
      expect(header).toHaveTextContent(expectedHeaders[index]);
    });
  }

  function assertTableRows(expectedRows: (RegExp | string)[]) {
    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(expectedRows.length);
    rows.forEach((row, index) => {
      expect(row).toHaveAccessibleName(expectedRows[index]);
    });
  }

  test('tree will render', () => {
    renderTree();
    assertTableHeaders(['Attribute', 'Type', 'Expression']);
    assertTableRows([ATTRIBUTES, PARAMS, NODE_BOOLEAN, NODE_NUMBER, USER]);
  });

  test('tree will render unknown values', () => {
    renderTree({ bla: 'unknown value' });
    assertTableRows([ATTRIBUTES, PARAMS, NODE_BOOLEAN, NODE_NUMBER, USER, /⛔ bla unknown value/]);
  });

  test('tree can expand / collapse', async () => {
    renderTree();
    const treeExpander = screen.getByRole('button', { name: 'Collapse tree' });
    await userEvent.click(treeExpander);
    assertTableRows([ATTRIBUTES, PARAMS]);

    await userEvent.click(treeExpander);
    assertTableRows([ATTRIBUTES, PARAMS, NODE_BOOLEAN, NODE_NUMBER, USER]);
  });

  test('tree row can expand / collapse', async () => {
    renderTree();
    const rowExpander = screen.getByRole('button', { name: 'Expand row' });
    await userEvent.click(rowExpander);
    assertTableRows([ATTRIBUTES, PARAMS, NODE_BOOLEAN, NODE_NUMBER, USER, NODE_STRING]);
    await userEvent.click(rowExpander);
    assertTableRows([ATTRIBUTES, PARAMS, NODE_BOOLEAN, NODE_NUMBER, USER]);
  });

  test('tree can edit expression', async () => {
    const view = renderTree();
    const rowExpander = screen.getByRole('button', { name: 'Expand row' });
    await userEvent.click(rowExpander);
    const inputs = screen.getAllByRole('textbox');
    expect(inputs).toHaveLength(5);

    await userEvent.click(inputs[2]);
    const mockInput = screen.getByTestId('code-editor');
    expect(mockInput).toHaveValue('');
    await userEvent.type(mockInput, '123');
    await userEvent.tab();
    expect(screen.queryByTestId('code-editor')).not.toBeInTheDocument();

    expect(inputs[0]).toHaveValue('in');
    expect(screen.getAllByRole('textbox')[2]).toHaveValue('123');
    expect(view.data()).toEqual({ 'param.procurementRequest': 'in', 'param.procurementRequest.amount': '123' });
  });

  test('tree will filter', async () => {
    renderTree();
    expect(screen.queryByPlaceholderText('Search')).not.toBeInTheDocument();
    const toggleFilter = screen.getByRole('button', { name: 'Toggle Search' });
    assertTableRows([ATTRIBUTES, PARAMS, NODE_BOOLEAN, NODE_NUMBER, USER]);

    await userEvent.click(toggleFilter);
    const searchInput = screen.getByPlaceholderText('Search');
    expect(searchInput).toHaveValue('');

    await userEvent.type(searchInput, 'amo');
    assertTableRows([ATTRIBUTES, PARAMS, NODE_NUMBER]);

    await userEvent.click(toggleFilter);
    expect(screen.queryByPlaceholderText('Search')).not.toBeInTheDocument();
    assertTableRows([ATTRIBUTES, PARAMS, NODE_BOOLEAN, NODE_NUMBER, USER]);

    await userEvent.click(toggleFilter);
    expect(screen.getByPlaceholderText('Search')).toHaveValue('');
  });

  test('tree will show only inscribed values', async () => {
    renderTree();
    expect(screen.queryByPlaceholderText('Search')).not.toBeInTheDocument();
    const toggleInscribed = screen.getByRole('button', { name: 'Toggle Inscribed' });
    assertTableRows([ATTRIBUTES, PARAMS, NODE_BOOLEAN, NODE_NUMBER, USER]);

    await userEvent.click(toggleInscribed);
    assertTableRows([ATTRIBUTES, NODE_PARAMS]);

    await userEvent.click(toggleInscribed);
    assertTableRows([ATTRIBUTES, PARAMS, NODE_BOOLEAN, NODE_NUMBER, USER]);
  });

  test('tree support readonly mode', async () => {
    render(<MappingTree data={{}} mappingInfo={mappingInfo} onChange={() => {}} location='' />, {
      wrapperProps: { editor: { readonly: true } }
    });
    expect(screen.getAllByRole('textbox')[0]).toBeDisabled();
  });
});
