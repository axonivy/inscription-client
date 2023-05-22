import { AlternativeConditions, ConnectorRef, NodeRef } from '@axonivy/inscription-protocol';

export interface Condition {
  fid: string;
  expression: string;
  target?: NodeRef;
}

export namespace Condition {
  export function of(altConditions: AlternativeConditions): Condition[] {
    return Object.entries(altConditions).map(cond => {
      return { fid: cond[0], expression: cond[1] };
    });
  }

  export function replace(conditions: Condition[], conditionId: string, connectorRef: ConnectorRef, sourcePid: string): Condition[] {
    if (connectorRef === undefined || connectorRef === null || connectorRef.source.pid !== sourcePid) {
      return conditions;
    }
    return conditions.map(cond => {
      if (cond.fid === conditionId) {
        cond.target = connectorRef.target;
      }
      return cond;
    });
  }

  export function update(conditions: Condition[], rowIndex: number, columnId: string, value: string): Condition[] {
    return conditions.map((row, index) => {
      if (index === rowIndex) {
        return {
          ...row,
          [columnId]: value
        };
      }
      return row;
    });
  }

  export function move(conditions: Condition[], moveId: string, targetId: string): Condition[] {
    const fromIndex = indexOf(conditions, moveId);
    const toIndex = indexOf(conditions, targetId);
    arraymove(conditions, fromIndex, toIndex);
    return conditions;
  }

  function indexOf(conditions: Condition[], fid: string): number {
    const cond = conditions.find(cond => cond.fid === fid);
    if (cond) {
      return conditions.indexOf(cond);
    }
    return -1;
  }

  function arraymove(arr: Condition[], fromIndex: number, toIndex: number) {
    var element = arr[fromIndex];
    arr.splice(fromIndex, 1);
    arr.splice(toIndex, 0, element);
  }

  export function to(conditions: Condition[]): AlternativeConditions {
    const altConditions: AlternativeConditions = {};
    conditions.forEach(cond => (altConditions[cond.fid] = cond.expression));
    return altConditions;
  }
}
