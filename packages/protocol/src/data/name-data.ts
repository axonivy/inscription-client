export type Document = {
  name: string;
  url: string;
};

export interface NameDataAccess {
  name: string;
  description: string;
  docs: Document[];
  tags: string[];
}
