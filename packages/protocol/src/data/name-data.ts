export type Document = {
  name: string;
  url: string;
};

export interface NameData {
  name: string;
  description: string;
  docs: Document[];
  tags: string[];
}

export const DEFAULT_NAME_DATA: NameData = {
  name: '',
  description: '',
  docs: [] as Document[],
  tags: [] as string[]
};
