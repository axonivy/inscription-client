import { Mapping } from '@axonivy/inscription-core';
import { USER_DIALOG_META_CALL } from '@axonivy/inscription-core/src/meta';
import { MappingTreeData } from './mapping-tree-data';

describe('MappingTreeData', () => {
  const treeData = USER_DIALOG_META_CALL;
  const tree: MappingTreeData[] = [
    {
      attribute: 'param',
      children: [
        {
          attribute: 'procurementRequest',
          children: [
            { attribute: 'accepted', children: [], expression: '', type: 'java.lang.Boolean', simpleType: 'Boolean' },
            { attribute: 'amount', children: [], expression: '', type: 'java.lang.Number', simpleType: 'Number' }
          ],
          expression: '',
          type: 'workflow.humantask.ProcurementRequest',
          simpleType: 'ProcurementRequest'
        }
      ],
      expression: '',
      type: '<workflow.humantask.ProcurementRequest procurementRequest>',
      simpleType: '<ProcurementRequest>'
    }
  ];

  function mappingTreeMultiRootData(): MappingTreeData[] {
    return JSON.parse(
      JSON.stringify([
        ...tree,
        {
          attribute: 'dummy',
          children: [],
          expression: '',
          type: 'dummyType'
        }
      ])
    );
  }

  test('of', () => {
    expect(MappingTreeData.of(treeData)).toEqual(tree);
  });

  test('update', () => {
    const resultTree = mappingTreeMultiRootData();
    const tree = JSON.parse(JSON.stringify(resultTree));
    MappingTreeData.update(tree, ['param', 'procurementRequest'], 'in');
    MappingTreeData.update(tree, ['param', 'procurementRequest', 'amount'], '12');
    MappingTreeData.update(tree, ['dummy'], 'dummy');

    expect(tree).not.toEqual(resultTree);
    resultTree[0].children[0].expression = 'in';
    resultTree[0].children[0].children[1].expression = '12';
    resultTree[1].expression = 'dummy';
    expect(tree).toEqual(resultTree);
  });

  test('update deep', () => {
    const resultTree = mappingTreeMultiRootData();
    let tree = JSON.parse(JSON.stringify(resultTree));
    tree = MappingTreeData.updateDeep(tree, [0], 'expression', 'root');
    tree = MappingTreeData.updateDeep(tree, [0, 0, 1], 'expression', '12');
    tree = MappingTreeData.updateDeep(tree, [1], 'expression', 'dummy');

    expect(tree).not.toEqual(resultTree);
    resultTree[0].expression = 'root';
    resultTree[0].children[0].children[1].expression = '12';
    resultTree[1].expression = 'dummy';
    expect(tree).toEqual(resultTree);
  });

  test('to', () => {
    const tree = mappingTreeMultiRootData();
    expect(MappingTreeData.to(tree)).toEqual([]);

    tree[0].expression = 'root';
    tree[0].children[0].children[1].expression = '12';
    tree[1].expression = 'dummy';
    const mapping = MappingTreeData.to(tree);
    assertDataMapping(mapping[0], { attribute: 'param', expression: 'root' });
    assertDataMapping(mapping[1], { attribute: 'param.procurementRequest.amount', expression: '12' });
    assertDataMapping(mapping[2], { attribute: 'dummy', expression: 'dummy' });
  });

  function assertDataMapping(mapping: Mapping, expectedMapping: Mapping) {
    expect(mapping.attribute).toEqual(expectedMapping.attribute);
    expect(mapping.expression).toEqual(expectedMapping.expression);
  }
});
