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

export interface NameDataAccess {
  nameData: NameData;
  'nameData/displayName': string;
  'nameData/description': string;
  'nameData/documents': Document[];
  'nameData/tags': string[];
}
