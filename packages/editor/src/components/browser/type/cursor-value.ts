import type { GenericData } from '../GenericBrowser';
import type { TypeBrowserObject } from './TypeBrowser';

const addListGeneric = (value: string, inCodeBlock: boolean) => {
  let listPrefix = 'java.util.List';
  if (inCodeBlock) {
    listPrefix = 'List';
  }
  return `${listPrefix}<${value}>`;
};

export const getCursorValue = (value: GenericData<TypeBrowserObject>, isIvyType: boolean, typeAsList: boolean, inCodeBlock: boolean) => {
  if (isIvyType) {
    return typeAsList ? addListGeneric(value.data.simpleName, inCodeBlock) : value.data.simpleName;
  } else {
    return typeAsList ? addListGeneric(value.data.fullQualifiedName, inCodeBlock) : value.data.fullQualifiedName;
  }
};
