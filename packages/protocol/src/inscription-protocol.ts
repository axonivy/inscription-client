import {
  CallableStart,
  ConnectorRef,
  ErrorMeta,
  InscriptionAction,
  InscriptionDataArgs,
  InscriptionValidation,
  MappingInfo,
  RoleMeta
} from './data/inscription';
import { InscriptionData, InscriptionSaveData } from './data/inscription-data';

export interface InscriptionRequestTypes {
  initialize: [void, boolean];
  data: [InscriptionDataArgs, InscriptionData];
  saveData: [InscriptionSaveData, InscriptionValidation[]];

  'meta/start/dialogs': [InscriptionDataArgs, CallableStart[]];
  'meta/start/triggers': [InscriptionDataArgs, CallableStart[]];
  'meta/start/calls': [InscriptionDataArgs, CallableStart[]];

  'meta/workflow/roles': [InscriptionDataArgs, RoleMeta[]];
  'meta/workflow/expiryErrors': [InscriptionDataArgs, ErrorMeta[]];
  'meta/out/map': [InscriptionDataArgs, MappingInfo];

  'meta/connector/of': [InscriptionDataArgs, ConnectorRef];

  action: [InscriptionAction, void];
}

export interface InscriptionNotificationTypes {
  dataChanged: InscriptionData;
  validation: InscriptionValidation[];
}
