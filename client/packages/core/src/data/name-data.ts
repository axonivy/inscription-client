export type Document = {
  name: string;
  url: string;
};

export interface NameData extends NameDataAccess {}

export interface NameDataAccess {
  name: string;
  description: string;
  docs: Document[];
  tags: string[];
}
