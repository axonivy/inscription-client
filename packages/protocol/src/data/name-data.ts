import { Document, Data } from './inscription';

export type NameData = Omit<Data, 'config'>;

export const DEFAULT_NAME_DATA: NameData = {
  name: '',
  description: '',
  docs: [] as Document[],
  tags: [] as string[]
};
