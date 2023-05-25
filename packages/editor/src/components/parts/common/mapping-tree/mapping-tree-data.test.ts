import { MappingInfo } from '@axonivy/inscription-protocol';
import { MappingTreeData } from './mapping-tree-data';
import { cloneObject } from 'test-utils';

describe('MappingTreeData', () => {
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

  const endlessParamInfo: MappingInfo = {
    variables: [
      {
        attribute: 'param.Endless',
        type: 'demo.Endless',
        simpleType: 'Endless'
      }
    ],
    types: {
      'demo.Endless': [
        {
          attribute: 'endless',
          type: 'demo.Endless',
          simpleType: 'Endless'
        }
      ]
    }
  };

  const tree: MappingTreeData[] = [
    {
      attribute: 'param.procurementRequest',
      children: [
        { attribute: 'accepted', children: [], value: '', type: 'Boolean', simpleType: 'Boolean', isLoaded: true },
        { attribute: 'amount', children: [], value: '', type: 'Number', simpleType: 'Number', isLoaded: true },
        { attribute: 'requester', children: [], value: '', type: 'workflow.humantask.User', simpleType: 'User', isLoaded: false }
      ],
      value: '',
      type: 'workflow.humantask.ProcurementRequest',
      simpleType: 'ProcurementRequest',
      isLoaded: true
    }
  ];

  const email_node: MappingTreeData = {
    attribute: 'email',
    children: [],
    isLoaded: true,
    simpleType: 'String',
    type: 'String',
    value: ''
  };

  function mappingTreeMultiRootData(): MappingTreeData[] {
    const multiRoot = cloneObject(tree);
    multiRoot.push({
      attribute: 'dummy',
      children: [],
      isLoaded: true,
      simpleType: 'dummy',
      value: '',
      type: 'dummyType'
    });
    return multiRoot;
  }

  test('of', () => {
    expect(MappingTreeData.of(mappingInfo)).toEqual(tree);
  });

  test('of with lazy loading', () => {
    const treeData = MappingTreeData.of(mappingInfo);
    MappingTreeData.loadChildrenFor(mappingInfo, 'workflow.humantask.User', treeData);

    const expectTree = cloneObject(tree);

    expectTree[0].children[2].isLoaded = true;
    expectTree[0].children[2].children = [email_node];

    expect(treeData).toEqual(expectTree);
  });

  test('of endless', () => {
    let treeData = MappingTreeData.of(endlessParamInfo);
    const endlessNode = {
      attribute: 'endless',
      children: [] as MappingTreeData[],
      isLoaded: false,
      simpleType: 'Endless',
      type: 'demo.Endless',
      value: ''
    };
    let expectTree = [
      {
        attribute: 'param.Endless',
        children: [{ ...endlessNode }],
        isLoaded: true,
        simpleType: 'Endless',
        type: 'demo.Endless',
        value: ''
      }
    ];
    expect(treeData).toEqual(expectTree);

    MappingTreeData.loadChildrenFor(endlessParamInfo, 'demo.Endless', treeData);
    expectTree[0].children[0].isLoaded = true;
    expectTree[0].children[0].children = [{ ...endlessNode }];
    expect(treeData).toEqual(expectTree);

    MappingTreeData.loadChildrenFor(endlessParamInfo, 'demo.Endless', treeData);
    expectTree[0].children[0].children[0].isLoaded = true;
    expectTree[0].children[0].children[0].children = [{ ...endlessNode }];
    expect(treeData).toEqual(expectTree);

    MappingTreeData.loadChildrenFor(endlessParamInfo, 'demo.Endless', treeData);
    expectTree[0].children[0].children[0].children[0].isLoaded = true;
    expectTree[0].children[0].children[0].children[0].children = [{ ...endlessNode }];
    expect(treeData).toEqual(expectTree);
  });

  test('update', () => {
    const resultTree = mappingTreeMultiRootData();
    const tree = cloneObject(resultTree);
    MappingTreeData.update(mappingInfo, tree, ['param', 'procurementRequest'], 'in');
    MappingTreeData.update(mappingInfo, tree, ['param', 'procurementRequest', 'amount'], '12');
    MappingTreeData.update(mappingInfo, tree, ['dummy'], 'dummy');

    expect(tree).not.toEqual(resultTree);
    resultTree[0].value = 'in';
    resultTree[0].children[1].value = '12';
    resultTree[1].value = 'dummy';
    expect(tree).toEqual(resultTree);
  });

  test('update should load lazy node', () => {
    const treeData = MappingTreeData.of(mappingInfo);
    MappingTreeData.update(mappingInfo, treeData, ['param', 'procurementRequest', 'requester', 'email'], 'luke@skywalker.com');

    const expectTree = cloneObject(tree);
    expectTree[0].children[2].isLoaded = true;
    expectTree[0].children[2].children = [{ ...email_node, value: 'luke@skywalker.com' }];

    expect(treeData).toEqual(expectTree);
  });

  test('update unknown mapping', () => {
    const treeData = MappingTreeData.of(mappingInfo);
    MappingTreeData.update(mappingInfo, treeData, ['dummy'], 'dummy');
    MappingTreeData.update(mappingInfo, treeData, ['param', 'unknown'], 'unknown value');
    MappingTreeData.update(mappingInfo, treeData, ['param', 'unknown', 'deep'], 'unknown deep value');

    const expectTree = cloneObject(tree);
    expectTree[1] = { attribute: 'dummy', children: [], value: 'dummy', type: '', simpleType: '', isLoaded: true };
    expectTree[2] = {
      attribute: 'param.unknown',
      children: [{ attribute: 'deep', children: [], value: 'unknown deep value', type: '', simpleType: '', isLoaded: true }],
      value: 'unknown value',
      type: '',
      simpleType: '',
      isLoaded: true
    };

    expect(treeData).toEqual(expectTree);
  });

  test('update deep', () => {
    const resultTree = mappingTreeMultiRootData();
    let tree = cloneObject(resultTree);
    tree = MappingTreeData.updateDeep(tree, [0], 'value', 'root');
    tree = MappingTreeData.updateDeep(tree, [0, 1], 'value', '12');
    tree = MappingTreeData.updateDeep(tree, [1], 'value', 'dummy');

    expect(tree).not.toEqual(resultTree);
    resultTree[0].value = 'root';
    resultTree[0].children[1].value = '12';
    resultTree[1].value = 'dummy';
    expect(tree).toEqual(resultTree);
  });

  test('to', () => {
    const tree = mappingTreeMultiRootData();
    expect(MappingTreeData.to(tree)).toEqual({});

    tree[0].value = 'root';
    tree[0].children[1].value = '12';
    tree[1].value = 'dummy';
    const mapping = MappingTreeData.to(tree);
    expect(mapping).toEqual({ 'param.procurementRequest': 'root', 'param.procurementRequest.amount': '12', dummy: 'dummy' });
  });
});