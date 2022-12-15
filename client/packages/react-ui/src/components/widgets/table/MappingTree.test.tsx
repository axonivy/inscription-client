import { Mapping } from '@axon-ivy/core/lib/inscription-model';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MappingTree from './MappingTree';

describe('MappingTree', () => {
  const data: Mapping[] = [
    {
      attribute: 'param',
      type: '<ProcurementRequest>',
      expression: '',
      children: [
        {
          attribute: 'procurementRequest',
          type: 'ProcurementRequest',
          expression: 'in',
          children: [
            { attribute: 'accepted', type: 'Boolean', expression: '', children: [] },
            { attribute: 'amount', type: 'Number', expression: '', children: [] }
          ]
        }
      ]
    }
  ];

  function renderTree(
    options: {
      onChange?: (change: Mapping[]) => void;
    } = {}
  ) {
    render(<MappingTree data={data} onChange={options.onChange ? options.onChange : () => { }} />);
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
    assertTableHeaders(['▶️ Attribute', 'Type', 'Expression']);
    assertTableRows([/▶️ Attribute/, /🔽 param <ProcurementRequest>/, /▶️ procurementRequest ProcurementRequest in/]);
  });

  test('tree can expand / collapse all', async () => {
    renderTree();
    const treeExpander = screen.getByRole('button', { name: 'Expand tree' });
    await userEvent.click(treeExpander);
    assertTableRows([
      /🔽 Attribute/,
      /🔽 param <ProcurementRequest>/,
      /🔽 procurementRequest ProcurementRequest in/,
      /🔵 accepted Boolean/,
      /🔵 amount Number/
    ]);

    await userEvent.click(treeExpander);
    assertTableRows([/▶️ Attribute/, /▶️ param <ProcurementRequest>/]);
  });

  test('tree can expand / collapse row', async () => {
    renderTree();
    const rowExpander = screen.getByRole('button', { name: 'Expand row' });
    await userEvent.click(rowExpander);
    assertTableRows([
      /▶️ Attribute/,
      /🔽 param <ProcurementRequest>/,
      /🔽 procurementRequest ProcurementRequest in/,
      /🔵 accepted Boolean/,
      /🔵 amount Number/
    ]);
    await userEvent.click(rowExpander);
    assertTableRows([/▶️ Attribute/, /🔽 param <ProcurementRequest>/, /▶️ procurementRequest ProcurementRequest in/]);
  });

  test('tree can edit expression', async () => {
    let mapping = { ...data };
    renderTree({ onChange: (change: Mapping[]) => (mapping = change) });
    const rowExpander = screen.getByRole('button', { name: 'Expand row' });
    await userEvent.click(rowExpander);
    const inputs = screen.getAllByRole('textbox');
    expect(inputs).toHaveLength(4);

    await userEvent.type(inputs[3], 'text3');
    await userEvent.tab();
    expect(inputs[1]).toHaveValue('in');
    expect(inputs[3]).toHaveValue('text3');
    // eslint-disable-next-line testing-library/no-node-access
    const exp1 = mapping[0].children[0].expression;
    // eslint-disable-next-line testing-library/no-node-access
    const exp2 = mapping[0].children[0].children[1].expression;
    expect(exp1).toEqual('in');
    expect(exp2).toEqual('text3');
  });
});
