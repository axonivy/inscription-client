export interface NameData {
  displayName: string;
  description: string;
  documents: Document[];
  tags: string[];
}

export type Document = {
  description: string;
  url: string;
};
