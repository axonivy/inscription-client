import { TreeData } from './tree';

export interface Mapping extends TreeData<Mapping> {
  attribute: string;
  type: string;
  expression: string;
}

export type MappingData = {
  mapping: Mapping[];
  code: string;
};
