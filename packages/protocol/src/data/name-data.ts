export type Document = {
  name: string;
  url: string;
};

export interface NameData {
  name?: string;
  description?: string;
  docs?: Document[];
  tags?: string[];
}
