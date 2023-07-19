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

export const mergePaths = (path1: string, path2?: string | number) => {
  if (path1.length === 0) {
    return path2 as SchemaPath;
  }
  if (path2 === undefined || (typeof path2 === 'string' && path2.length === 0)) {
    return path1 as SchemaPath;
  }
  if (typeof path2 === 'number') {
    return `${path1}.[${path2}]` as SchemaPath;
  }
  return `${path1}.${path2}` as SchemaPath;
};
