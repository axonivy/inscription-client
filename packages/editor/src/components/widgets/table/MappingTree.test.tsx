import { MappingInfo } from '@axonivy/inscription-protocol';
import { Mapping } from '@axonivy/inscription-protocol';
import { render, screen, userEvent } from 'test-utils';
import MappingTree from './MappingTree';

describe('MappingTree', () => {
  const COL_ATTRIBUTES = /▶️ Attribute/;
  const EXP_ATTRIBUTES = /🔽 Attribute/;
  const COL_PARAMS = /▶️ param.procurementRequest/;
  const EXP_PARAMS = /🔽 param.procurementRequest/;
  const NODE_PARAMS = /🔵 param.procurementRequest/;
  const NODE_BOOLEAN = /🔵 accepted Boolean/;
  const NODE_NUMBER = /🔵 amount Number/;
  const COL_USER = /▶️ requester workflow.humantask.User/;
  const EXP_USER = /🔽 requester workflow.humantask.User/;
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

  function renderTree(initData?: Mapping[]): {
    data: () => Mapping[];
  } {
    userEvent.setup();
    let data: Mapping[] = initData ?? [{ key: 'param.procurementRequest', value: 'in' }];
    render(<MappingTree data={data} mappingInfo={mappingInfo} onChange={(change: Mapping[]) => (data = change)} location='test' />);
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
    assertTableHeaders(['🔽 Attribute', 'Type', 'Expression']);
    assertTableRows([EXP_ATTRIBUTES, EXP_PARAMS, NODE_BOOLEAN, NODE_NUMBER, COL_USER]);
  });

  test('tree will render unknown values', () => {
    renderTree([{ key: 'bla', value: 'unknown value' }]);
    assertTableRows([EXP_ATTRIBUTES, EXP_PARAMS, NODE_BOOLEAN, NODE_NUMBER, COL_USER, /⛔ bla unknown value/]);
  });

  test('tree can expand / collapse', async () => {
    renderTree();
    const treeExpander = screen.getByRole('button', { name: 'Collapse tree' });
    await userEvent.click(treeExpander);
    assertTableRows([COL_ATTRIBUTES, COL_PARAMS]);

    await userEvent.click(treeExpander);
    assertTableRows([EXP_ATTRIBUTES, EXP_PARAMS, NODE_BOOLEAN, NODE_NUMBER, COL_USER]);
  });

  test('tree row can expand / collapse', async () => {
    renderTree();
    const rowExpander = screen.getByRole('button', { name: 'Expand row' });
    await userEvent.click(rowExpander);
    assertTableRows([EXP_ATTRIBUTES, EXP_PARAMS, NODE_BOOLEAN, NODE_NUMBER, EXP_USER, NODE_STRING]);
    await userEvent.click(rowExpander);
    assertTableRows([COL_ATTRIBUTES, EXP_PARAMS, NODE_BOOLEAN, NODE_NUMBER, COL_USER]);
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
    assertDataMapping(view.data()[0], { key: 'param.procurementRequest', value: 'in' });
    assertDataMapping(view.data()[1], { key: 'param.procurementRequest.amount', value: '123' });
  });

  test('tree will filter', async () => {
    renderTree();
    expect(screen.queryByPlaceholderText('Search')).not.toBeInTheDocument();
    const toggleFilter = screen.getByRole('button', { name: 'Toggle Search' });
    assertTableRows([EXP_ATTRIBUTES, EXP_PARAMS, NODE_BOOLEAN, NODE_NUMBER, COL_USER]);

    await userEvent.click(toggleFilter);
    const searchInput = screen.getByPlaceholderText('Search');
    expect(searchInput).toHaveValue('');

    await userEvent.type(searchInput, 'amo');
    assertTableRows([EXP_ATTRIBUTES, EXP_PARAMS, NODE_NUMBER]);

    await userEvent.click(toggleFilter);
    expect(screen.queryByPlaceholderText('Search')).not.toBeInTheDocument();
    assertTableRows([EXP_ATTRIBUTES, EXP_PARAMS, NODE_BOOLEAN, NODE_NUMBER, COL_USER]);

    await userEvent.click(toggleFilter);
    expect(screen.getByPlaceholderText('Search')).toHaveValue('');
  });

  test('tree will show only inscribed values', async () => {
    renderTree();
    expect(screen.queryByPlaceholderText('Search')).not.toBeInTheDocument();
    const toggleInscribed = screen.getByRole('button', { name: 'Toggle Inscribed' });
    assertTableRows([EXP_ATTRIBUTES, EXP_PARAMS, NODE_BOOLEAN, NODE_NUMBER, COL_USER]);

    await userEvent.click(toggleInscribed);
    assertTableRows([EXP_ATTRIBUTES, NODE_PARAMS]);

    await userEvent.click(toggleInscribed);
    assertTableRows([EXP_ATTRIBUTES, EXP_PARAMS, NODE_BOOLEAN, NODE_NUMBER, COL_USER]);
  });

  test('tree support readonly mode', async () => {
    render(<MappingTree data={[]} mappingInfo={mappingInfo} onChange={() => {}} location='' />, {
      wrapperProps: { editor: { readonly: true } }
    });
    expect(screen.getAllByRole('textbox')[0]).toBeDisabled();
  });

  function assertDataMapping(mapping: Mapping, expectedMapping: Mapping) {
    expect(mapping.key).toEqual(expectedMapping.key);
    expect(mapping.value).toEqual(expectedMapping.value);
  }
});
