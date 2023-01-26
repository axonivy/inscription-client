import { Mapping, MappingInfo, Variable } from '@axonivy/inscription-protocol';

export interface MappingTreeData extends Variable, Omit<Mapping, 'key'> {
  children: MappingTreeData[];
  isLoaded: boolean;
}

export namespace MappingTreeData {
  export function of(paramInfo: MappingInfo): MappingTreeData[] {
    return paramInfo.variables.map(param => ({
      ...param,
      value: '',
      children: typesOfParam(paramInfo, param.type),
      isLoaded: true
    }));
  }

  export function loadChildrenFor(paramInfo: MappingInfo, paramType: string, tree: MappingTreeData[]): MappingTreeData[] {
    return tree.map(node => {
      if (node.isLoaded === false && node.type === paramType) {
        node.children = typesOfParam(paramInfo, paramType);
        node.isLoaded = true;
      } else {
        loadChildrenFor(paramInfo, paramType, node.children);
      }
      return node;
    });
  }

  function typesOfParam(paramInfo: MappingInfo, paramType: string): MappingTreeData[] {
    return (
      paramInfo.types[paramType]?.map(type => ({
        ...type,
        value: '',
        children: [],
        isLoaded: paramInfo.types[type.type] === undefined
      })) ?? []
    );
  }

  export function update(paramInfo: MappingInfo, tree: MappingTreeData[], mappingPath: string[], mappingValue: string): void {
    if (mappingPath.length >= 2 && mappingPath[0] === 'param') {
      mappingPath.shift();
      mappingPath[0] = 'param.' + mappingPath[0];
    }
    updateValue(paramInfo, tree, mappingPath, mappingValue);
  }

  function updateValue(paramInfo: MappingInfo, tree: MappingTreeData[], mappingPath: string[], mappingValue: string): void {
    for (const node of tree) {
      if (node.attribute === mappingPath[0]) {
        mappingPath.shift();
        if (mappingPath.length === 0) {
          node.value = mappingValue;
        } else {
          if (node.isLoaded === false) {
            loadChildrenFor(paramInfo, node.type, tree);
          }
          return updateValue(paramInfo, node.children, mappingPath, mappingValue);
        }
      }
    }
    addUnknownValue(tree, mappingPath, mappingValue);
  }

  function addUnknownValue(tree: MappingTreeData[], mappingPath: string[], mappingValue: string): void {
    const attribute = mappingPath.shift();
    if (attribute) {
      if (mappingPath.length === 0) {
        tree.push({ attribute: attribute, type: '', simpleType: '', value: mappingValue, children: [], isLoaded: true });
      } else {
        const children: MappingTreeData[] = [];
        tree.push({
          attribute: attribute,
          type: '',
          simpleType: '',
          value: '',
          children: children,
          isLoaded: true
        });
        addUnknownValue(children, mappingPath, mappingValue);
      }
    }
  }

  export function updateDeep(data: MappingTreeData[], rows: number[], columnId: string, value: unknown): MappingTreeData[] {
    return data.map((row, index) => {
      const subRows = [...rows];
      const rowIndex = subRows.shift();
      if (index === rowIndex) {
        const rowData = data[rowIndex];
        if (subRows.length === 0) {
          return {
            ...rowData,
            [columnId]: value
          };
        } else {
          return {
            ...data[rowIndex]!,
            children: updateDeep(rowData.children, subRows, columnId, value)
          };
        }
      }
      return row;
    });
  }

  export function to(tree: MappingTreeData[]): Mapping[] {
    return tree.flatMap(node => {
      const mappings: Mapping[] = [];
      if (node.value.length > 0) {
        mappings.push({ key: node.attribute, value: node.value });
      }
      if (node.children.length > 0) {
        mappings.push(
          ...to(node.children).map(mapping => {
            return { ...mapping, key: `${node.attribute}.${mapping.key}` };
          })
        );
      }
      return mappings;
    });
  }
}
