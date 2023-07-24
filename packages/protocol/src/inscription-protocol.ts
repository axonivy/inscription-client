import {
  CallableStart,
  ConnectorRef,
  ErrorMeta,
  EventCodeMeta,
  InscriptionActionArgs,
  InscriptionContext,
  InscriptionValidation,
  RoleMeta,
  ScriptingDataArgs,
  VariableInfo
} from './data/inscription';
import { InscriptionData, InscriptionSaveData } from './data/inscription-data';

export interface InscriptionRequestTypes {
  initialize: [void, boolean];
  data: [InscriptionContext, InscriptionData];
  saveData: [InscriptionSaveData, InscriptionValidation[]];

  validate: [InscriptionContext, InscriptionValidation[]];

  'meta/start/dialogs': [InscriptionContext, CallableStart[]];
  'meta/start/triggers': [InscriptionContext, CallableStart[]];
  'meta/start/calls': [InscriptionContext, CallableStart[]];

  'meta/workflow/roles': [InscriptionContext, RoleMeta[]];
  'meta/workflow/expiryErrors': [InscriptionContext, ErrorMeta[]];
  'meta/workflow/errorCodes': [InscriptionContext, EventCodeMeta[]];
  'meta/workflow/signalCodes': [InscriptionContext, EventCodeMeta[]];

  'meta/scripting/out': [ScriptingDataArgs, VariableInfo];
  'meta/scripting/in': [ScriptingDataArgs, VariableInfo];

  'meta/connector/of': [InscriptionContext, ConnectorRef];

  action: [InscriptionActionArgs, void];
}

export interface InscriptionNotificationTypes {
  dataChanged: InscriptionData;
  validation: InscriptionValidation[];
}
