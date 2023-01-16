export interface DialogStart {
  id: string;
  dialog: string;
  dialogName: string;
  startName: string;
  description: string;
  packageName: string;
  project: string;
  callParameter: Variable[];
}

export interface Role {
  id: string;
  label: string;
}

export interface ExpiryError {
  id: string;
  label: string;
}

export interface Variable {
  attribute: string;
  type: string;
  simpleType: string;
  children: Variable[];
}
