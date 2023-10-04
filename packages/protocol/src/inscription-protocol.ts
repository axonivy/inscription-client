import {
  CallableStart,
  ConnectorRef,
  DataClass,
  DatabaseColumn,
  DatabaseColumnRequest,
  DatabaseTablesRequest,
  ErrorCodeRequest,
  ErrorStartMeta,
  EventCodeMeta,
  InscriptionActionArgs,
  InscriptionContext,
  InscriptionValidation,
  RestClient,
  RestClientRequest,
  RestContentTypeRequest,
  RestResource,
  RestResourceMeta,
  RestResourceRequest,
  RoleMeta,
  ScriptingDataArgs,
  VariableInfo,
  WebServiceClient,
  WebServiceClientRequest,
  WebServiceOperation,
  WebServicePortRequest
} from './data/inscription';
import { InscriptionData, InscriptionSaveData } from './data/inscription-data';

export interface InscriptionMetaRequestTypes {
  'meta/start/dialogs': [InscriptionContext, CallableStart[]];
  'meta/start/triggers': [InscriptionContext, CallableStart[]];
  'meta/start/calls': [InscriptionContext, CallableStart[]];

  'meta/workflow/roles': [InscriptionContext, RoleMeta[]];
  'meta/workflow/errorStarts': [InscriptionContext, ErrorStartMeta[]];
  'meta/workflow/errorCodes': [ErrorCodeRequest, EventCodeMeta[]];
  'meta/workflow/signalCodes': [InscriptionContext, EventCodeMeta[]];

  'meta/database/names': [InscriptionContext, string[]];
  'meta/database/tables': [DatabaseTablesRequest, string[]];
  'meta/database/columns': [DatabaseColumnRequest, DatabaseColumn[]];

  'meta/webservice/clients': [InscriptionContext, WebServiceClient[]];
  'meta/webservice/ports': [WebServiceClientRequest, string[]];
  'meta/webservice/operations': [WebServicePortRequest, WebServiceOperation[]];
  'meta/webservice/properties': [WebServiceClientRequest, string[]];

  'meta/rest/clients': [InscriptionContext, RestClient[]];
  'meta/rest/resources': [RestClientRequest, RestResourceMeta[]];
  'meta/rest/resource': [RestResourceRequest, RestResource];
  'meta/rest/headers': [void, string[]];
  'meta/rest/contentTypes': [RestContentTypeRequest, string[]];
  'meta/rest/properties': [void, string[]];

  'meta/scripting/out': [ScriptingDataArgs, VariableInfo];
  'meta/scripting/in': [ScriptingDataArgs, VariableInfo];
  'meta/scripting/dataClasses': [InscriptionContext, DataClass[]];

  'meta/connector/out': [InscriptionContext, ConnectorRef[]];
}

export interface InscriptionRequestTypes extends InscriptionMetaRequestTypes {
  initialize: [void, boolean];
  data: [InscriptionContext, InscriptionData];
  saveData: [InscriptionSaveData, InscriptionValidation[]];

  validate: [InscriptionContext, InscriptionValidation[]];

  action: [InscriptionActionArgs, void];
}

export interface InscriptionNotificationTypes {
  dataChanged: InscriptionData;
  validation: InscriptionValidation[];
}
