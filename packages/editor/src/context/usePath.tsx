import { SchemaPath, SchemaKeys } from '@axonivy/inscription-protocol';
import React, { ReactNode, useContext } from 'react';

const PathContextInstance = React.createContext<SchemaPath | SchemaKeys | ''>('');

export const useFullPath = (path?: SchemaKeys) => {
  const parentPath = useContext(PathContextInstance);
  return mergePaths(parentPath, path);
};

export const PathContext = ({ path, children }: { path: SchemaKeys; children: ReactNode }) => {
  const fullPath = useFullPath(path);
  return <PathContextInstance.Provider value={fullPath}>{children}</PathContextInstance.Provider>;
};

export const usePath = () => useContext(PathContextInstance);

export const mergePaths = (path1: string, path2?: string | number) => mergeSchemaPaths(path1, path2) as SchemaPath;

const mergeSchemaPaths = (path1: string, path2?: string | number): string => {
  if (path1.length === 0) {
    return pathToString(path2);
  }
  if (path2 === undefined || (typeof path2 === 'string' && path2.length === 0)) {
    return path1;
  }
  return `${path1}.${pathToString(path2)}`;
};

const pathToString = (path?: string | number): string => {
  if (Number.isInteger(path)) {
    return `[${path}]`;
  }
  if (path) {
    return path as string;
  }
  return '';
};
