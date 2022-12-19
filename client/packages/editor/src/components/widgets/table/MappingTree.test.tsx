import React from 'react';
import { USER_DIALOG_META_CALL } from '@axonivy/inscription-core/lib/meta/inscription-meta';
import { Mapping } from '@axonivy/inscription-core/lib/data/call-data';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MappingTree from './MappingTree';

describe('MappingTree', () => {
  const data: Mapping[] = [{ attribute: 'param.procurementRequest', expression: 'in' }];

  function renderTree(
    options: {
      onChange?: (change: Mapping[]) => void;
    } = {}
  ) {
    render(<MappingTree data={data} mappingTree={USER_DIALOG_META_CALL} onChange={options.onChange ? options.onChange : () => {}} />);
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
    assertDataMapping(mapping[0], { attribute: 'param.procurementRequest', expression: 'in' });
    assertDataMapping(mapping[1], { attribute: 'param.procurementRequest.amount', expression: 'text3' });
  });

  function assertDataMapping(mapping: Mapping, expectedMapping: Mapping) {
    expect(mapping.attribute).toEqual(expectedMapping.attribute);
    expect(mapping.expression).toEqual(expectedMapping.expression);
  }
});
