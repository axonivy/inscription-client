import type { TypeBrowserObject } from './TypeBrowser';

const addListGeneric = (value: string, inCodeBlock: boolean) => {
  let listPrefix = 'java.util.List';
  if (inCodeBlock) {
    listPrefix = 'List';
  }
  return `${listPrefix}<${value}>`;
};

export const getCursorValue = (value: TypeBrowserObject, isIvyType: boolean, typeAsList: boolean, inCodeBlock: boolean) => {
  if (isIvyType) {
    return typeAsList ? addListGeneric(value.simpleName, inCodeBlock) : value.simpleName;
  } else {
    return typeAsList ? addListGeneric(value.fullQualifiedName, inCodeBlock) : value.fullQualifiedName;
  }
};
