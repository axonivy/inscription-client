import { Brand, SchemaKeys } from '@axonivy/inscription-protocol';
import React, { ReactNode, useContext } from 'react';

type FullPath = Brand<string, 'Path'>;
const PathContextInstance = React.createContext<FullPath | SchemaKeys | ''>('');

export const useFullPath = (path?: SchemaKeys) => {
  const parentPath = useContext(PathContextInstance);
  if (parentPath.length === 0) {
    return path as FullPath;
  }
  if (path === undefined || path.length === 0) {
    return parentPath as FullPath;
  }
  return `${parentPath}.${path}` as FullPath;
};

export const PathContext = ({ path, children }: { path: SchemaKeys; children: ReactNode }) => {
  const fullPath = useFullPath(path);
  return <PathContextInstance.Provider value={fullPath}>{children}</PathContextInstance.Provider>;
};

export const usePath = () => useContext(PathContextInstance);
