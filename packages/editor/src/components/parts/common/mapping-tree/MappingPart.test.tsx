import { VariableInfo } from '@axonivy/inscription-protocol';
import { render, screen, userEvent } from 'test-utils';
import MappingPart from './MappingPart';

describe('MappingPart', () => {
  const ATTRIBUTES = /Attribute/;
  const PARAMS = /param.procurementRequest/;
  const NODE_PARAMS = /param.procurementRequest/;
  const NODE_BOOLEAN = /acceptedBoolean/;
  const NODE_NUMBER = /amountNumber/;
  const USER = /requesterUser/;
  const NODE_STRING = /emailString/;

  const variableInfo: VariableInfo = {
    variables: [
      {
        attribute: 'param.procurementRequest',
        type: 'workflow.humantask.ProcurementRequest',
        simpleType: 'ProcurementRequest',
        description: 'this is a description'
      }
    ],
    types: {
      'workflow.humantask.ProcurementRequest': [
        {
          attribute: 'accepted',
          type: 'Boolean',
          simpleType: 'Boolean',
          description: ''
        },
        {
          attribute: 'amount',
          type: 'Number',
          simpleType: 'Number',
          description: ''
        },
        {
          attribute: 'requester',
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
        }
      ]
    }
  };

  function renderTree(initData?: Record<string, string>): {
    data: () => Record<string, string>;
  } {
    userEvent.setup();
    let data = initData ?? { 'param.procurementRequest': 'in' };
    render(
      <MappingPart
        browsers={['attr', 'func', 'datatype']}
        data={data}
        variableInfo={variableInfo}
        onChange={(change: Record<string, string>) => (data = change)}
      />
    );
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
      expect(row).toHaveTextContent(expectedRows[index]);
    });
  }

  test('tree will render', () => {
    renderTree();
    assertTableHeaders(['Attribute', 'Type', 'Expression']);
    assertTableRows([ATTRIBUTES, PARAMS, NODE_BOOLEAN, NODE_NUMBER, USER]);
  });

  test('tree will render unknown values', () => {
    renderTree({ bla: 'unknown value' });
    assertTableRows([ATTRIBUTES, PARAMS, NODE_BOOLEAN, NODE_NUMBER, USER, /⛔bla/]);
  });

  test('tree will render description title', () => {
    renderTree({ 'workflow.humantask.Description': 'value' });
    expect(screen.getAllByRole('row')[1]).toHaveTextContent('param.procurementRequestProcurementRequest');
    expect(screen.getAllByRole('row')[1]).toHaveAccessibleName('this is a description workflow.humantask.ProcurementRequest');
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
    assertTableRows([ATTRIBUTES, PARAMS, NODE_BOOLEAN, NODE_NUMBER, USER, NODE_STRING]);
  });

  test('tree can edit expression', async () => {
    const view = renderTree();
    const rowExpander = screen.getByRole('button', { name: 'Expand row' });
    await userEvent.click(rowExpander);
    const inputs = screen.getAllByRole('textbox');
    expect(inputs).toHaveLength(5);

    await userEvent.click(inputs[2]);
    const mockInput = screen.getByLabelText('Code');
    expect(mockInput).toHaveValue('');
    await userEvent.type(mockInput, '123');
    await userEvent.click(screen.getByRole('button', { name: 'Close' }));
    expect(screen.queryByLabelText('Code')).not.toBeInTheDocument();

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
    render(<MappingPart browsers={['attr', 'func', 'datatype']} data={{}} variableInfo={variableInfo} onChange={() => {}} />, {
      wrapperProps: { editor: { readonly: true } }
    });
    expect(screen.getAllByRole('textbox')[0]).toBeDisabled();
  });
});
