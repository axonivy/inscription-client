import { Mapping, Variable } from '@axonivy/inscription-core';

export interface MappingTreeData extends Variable, Mapping {
  children: MappingTreeData[];
}

export namespace MappingTreeData {
  export function of(tree?: Variable[]): MappingTreeData[] {
    if (!tree) {
      return [];
    }
    const treeData = tree?.map(node => {
      return { ...node, expression: '', children: of(node.children) };
    });
    return treeData;
  }

  export function update(tree: MappingTreeData[], mappingPath: string[], mappingValue: string): void {
    if (tree.length === 0) {
      return;
    }
    tree.forEach(node => {
      if (node.attribute === mappingPath[0]) {
        mappingPath.shift();
        if (mappingPath.length === 0) {
          node.expression = mappingValue;
        } else {
          update(node.children, mappingPath, mappingValue);
        }
      }
    });
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
      if (node.expression.length > 0) {
        mappings.push(node);
      }
      if (node.children.length > 0) {
        mappings.push(
          ...to(node.children).map(mapping => {
            return { ...mapping, attribute: `${node.attribute}.${mapping.attribute}` };
          })
        );
      }
      return mappings;
    });
  }
}
