import React, { useContext } from 'react';

export type ReadonlyContext = boolean;

export const ReadonlyContextInstance = React.createContext<ReadonlyContext>(false);
export const useReadonly = (): ReadonlyContext => useContext(ReadonlyContextInstance);
