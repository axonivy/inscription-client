import { Document, Data } from "./inscription";

export interface NameData extends Data{};

export const DEFAULT_NAME_DATA: NameData = {
  name: '',
  description: '',
  config: {},
  docs: [] as Document[],
  tags: [] as string[]
};
