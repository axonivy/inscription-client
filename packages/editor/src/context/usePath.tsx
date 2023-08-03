import { SchemaPath, SchemaKeys } from '@axonivy/inscription-protocol';
import React, { ReactNode, useContext } from 'react';

const PathContextInstance = React.createContext<SchemaPath | SchemaKeys | ''>('');

export const PathContext = ({ path, children }: { path: SchemaKeys; children: ReactNode }) => {
  const fullPath = useFullPath([path]);
  return <PathContextInstance.Provider value={fullPath}>{children}</PathContextInstance.Provider>;
};

export const usePath = () => useContext(PathContextInstance);

export const useFullPath = (paths?: SchemaKeys[]) => {
  const parentPath = useContext(PathContextInstance);
  return mergePaths(parentPath, paths ?? []);
};

export const mergePaths = (parentPath: string, subPaths: Array<string | number>) => mergeSchemaPaths(parentPath, subPaths) as SchemaPath;

const mergeSchemaPaths = (parentPath: string, subPaths: Array<string | number>): string => {
  if (parentPath.length === 0) {
    return pathToString(subPaths);
  }
  if (subPaths.length === 0) {
    return parentPath;
  }
  return `${parentPath}.${pathToString(subPaths)}`;
};

const pathToString = (paths: Array<string | number>): string => {
  return paths.map(path => (Number.isInteger(path) ? `[${path}]` : path)).join('.');
};
