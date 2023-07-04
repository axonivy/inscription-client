import {
  CallableStart,
  ConnectorRef,
  ErrorMeta,
  EventCodeMeta,
  InscriptionAction,
  InscriptionDataArgs,
  InscriptionValidation,
  RoleMeta,
  ScriptingDataArgs,
  VariableInfo
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
  'meta/workflow/errorCodes': [InscriptionDataArgs, EventCodeMeta[]];
  'meta/workflow/signalCodes': [InscriptionDataArgs, EventCodeMeta[]];

  'meta/scripting/out': [ScriptingDataArgs, VariableInfo];
  'meta/scripting/in': [ScriptingDataArgs, VariableInfo];

  'meta/connector/of': [InscriptionDataArgs, ConnectorRef];

  action: [InscriptionAction, void];
}

export interface InscriptionNotificationTypes {
  dataChanged: InscriptionData;
  validation: InscriptionValidation[];
}
