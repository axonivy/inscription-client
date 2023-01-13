import { Mapping } from '@axonivy/inscription-protocol';
import { Variable } from '@axonivy/inscription-protocol';
import { MappingTreeData } from './mapping-tree-data';

describe('MappingTreeData', () => {
  const treeData: Variable[] = [
    {
      attribute: 'param',
      type: '<workflow.humantask.ProcurementRequest procurementRequest>',
      simpleType: '<ProcurementRequest>',
      children: [
        {
          attribute: 'procurementRequest',
          type: 'workflow.humantask.ProcurementRequest',
          simpleType: 'ProcurementRequest',
          children: [
            { attribute: 'accepted', type: 'java.lang.Boolean', simpleType: 'Boolean', children: [] },
            { attribute: 'amount', type: 'java.lang.Number', simpleType: 'Number', children: [] }
          ]
        }
      ]
    }
  ];

  const tree: MappingTreeData[] = [
    {
      attribute: 'param',
      children: [
        {
          attribute: 'procurementRequest',
          children: [
            { attribute: 'accepted', children: [], value: '', type: 'java.lang.Boolean', simpleType: 'Boolean' },
            { attribute: 'amount', children: [], value: '', type: 'java.lang.Number', simpleType: 'Number' }
          ],
          value: '',
          type: 'workflow.humantask.ProcurementRequest',
          simpleType: 'ProcurementRequest'
        }
      ],
      value: '',
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
          value: '',
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
    resultTree[0].children[0].value = 'in';
    resultTree[0].children[0].children[1].value = '12';
    resultTree[1].value = 'dummy';
    expect(tree).toEqual(resultTree);
  });

  test('update deep', () => {
    const resultTree = mappingTreeMultiRootData();
    let tree = JSON.parse(JSON.stringify(resultTree));
    tree = MappingTreeData.updateDeep(tree, [0], 'value', 'root');
    tree = MappingTreeData.updateDeep(tree, [0, 0, 1], 'value', '12');
    tree = MappingTreeData.updateDeep(tree, [1], 'value', 'dummy');

    expect(tree).not.toEqual(resultTree);
    resultTree[0].value = 'root';
    resultTree[0].children[0].children[1].value = '12';
    resultTree[1].value = 'dummy';
    expect(tree).toEqual(resultTree);
  });

  test('to', () => {
    const tree = mappingTreeMultiRootData();
    expect(MappingTreeData.to(tree)).toEqual([]);

    tree[0].value = 'root';
    tree[0].children[0].children[1].value = '12';
    tree[1].value = 'dummy';
    const mapping = MappingTreeData.to(tree);
    assertDataMapping(mapping[0], { key: 'param', value: 'root' });
    assertDataMapping(mapping[1], { key: 'param.procurementRequest.amount', value: '12' });
    assertDataMapping(mapping[2], { key: 'dummy', value: 'dummy' });
  });

  function assertDataMapping(mapping: Mapping, expectedMapping: Mapping) {
    expect(mapping.key).toEqual(expectedMapping.key);
    expect(mapping.value).toEqual(expectedMapping.value);
  }
});
