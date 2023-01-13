import { InscriptionValidation } from '@axonivy/inscription-protocol';
import { createContext, useContext } from 'react';

export interface DataContext {
  initialData: any;
  data: any;
  updateData: <T>(path: string | string[], value: T) => void;
  validation: InscriptionValidation[];
}

const defaultDataContext: any = undefined;

export const DataContextInstance = createContext<DataContext>(defaultDataContext);
export const useDataContext = (): DataContext => useContext(DataContextInstance);
