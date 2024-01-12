import type { Function } from '@axonivy/inscription-protocol';
import type { GenericData } from './GenericBrowser';
import type { UpdatedFunction } from './function/FunctionBrowser';
import type { Action } from '../widgets';

export function mapToGenericData<T>(
  browserObject: T,
  childrenParam?: keyof T,
  isNotSelectable?: (object: T) => boolean,
  specialAction?: (object: T) => Action[]
): GenericData<T> {
  const children = childrenParam ? ((browserObject[childrenParam] || []) as T[]) : undefined;

  return {
    browserObject,
    isNotSelectable: isNotSelectable ? isNotSelectable(browserObject) : undefined,
    specialAction: specialAction ? specialAction(browserObject) : undefined,
    children: children ? children.map((child: T) => mapToGenericData(child, childrenParam, isNotSelectable, specialAction)) : []
  };
}

export const mapToUpdatedFunction = (func: Function): UpdatedFunction => {
  return {
    ...func,
    returnType: {
      packageName: func.returnType.packageName,
      simpleName: func.returnType.simpleName
    },
    functions: func.returnType.functions ? func.returnType.functions.map(child => mapToUpdatedFunction(child)) : []
  };
};
