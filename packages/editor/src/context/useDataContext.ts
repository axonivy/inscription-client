import { Data, InscriptionValidation } from '@axonivy/inscription-protocol';
import { createContext, useContext } from 'react';

export interface DataContext {
  initialData: Data;
  data: Data;
  setData: (data: any) => void;
  validation: InscriptionValidation[];
}

const defaultDataContext: any = undefined;

export const DataContextInstance = createContext<DataContext>(defaultDataContext);
export const useDataContext = (): DataContext => useContext(DataContextInstance);
