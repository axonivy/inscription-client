export interface Role {
  id: string;
  label: string;
}

export interface ExpiryError {
  id: string;
  label: string;
}

export interface DialogStart {
  id: string;
  dialog: string;
  dialogName: string;
  startName: string;
  description: string;
  packageName: string;
  project: string;
  callParameter: MappingInfo;
}

export interface MappingInfo {
  variables: Variable[];
  types: Record<string, Variable[] | undefined>;
}

export interface Variable {
  attribute: string;
  type: string;
  simpleType: string;
}
