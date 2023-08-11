import {
  CallData,
  ElementData,
  DialogCallData,
  Document,
  ElementScript,
  EndPageData,
  NameData,
  ProcessCallData,
  ConditionData,
  StartData,
  ScriptVariable,
  ResultData,
  ErrorCatchData,
  SignalCatchData,
  MailData,
  MAIL_TYPE,
  IVY_EXCEPTIONS,
  TriggerData,
  RequestData,
  StartCustomStartField,
  RestBody,
  DbQuery,
  Cache,
  JavaTimeout,
  JavaEventTimeout,
  ErrorDefinition,
  SoapOperation,
  SoapWsProcessException,
  RestResponse,
  RestTarget
} from '../data';
import { DEFAULT_TASK_DATA, DEFAULT_CASE_DATA } from './workflow-defaults';

export const DEFAULT_NAME_DATA: NameData = {
  name: '',
  description: '',
  docs: [] as Document[],
  tags: [] as string[]
};

export const DEFAULT_OUTPUT_DATA: ElementScript = {
  output: {
    map: {},
    code: ''
  },
  sudo: false
} as const;

export const DEFAULT_CALL_DATA: CallData & DialogCallData & ProcessCallData = {
  dialog: '',
  processCall: '',
  call: {
    map: {},
    code: ''
  }
} as const;

export const DEFAULT_END_PAGE_DATA: EndPageData = {
  page: ''
} as const;

export const DEFAULT_CONDITION_DATA: ConditionData = {
  conditions: {}
} as const;

export const DEFAULT_START_DATA: StartData = {
  signature: '',
  input: {
    code: '',
    map: {},
    params: [] as ScriptVariable[]
  }
} as const;

export const DEFAULT_RESULT_DATA: ResultData = {
  result: {
    code: '',
    map: {},
    params: [] as ScriptVariable[]
  }
} as const;

export const DEFAULT_ERROR_CATCH_DATA: ErrorCatchData = {
  errorCode: ''
} as const;

export const DEFAULT_SIGNAL_CATCH_DATA: SignalCatchData = {
  signalCode: '',
  attachToBusinessCase: true
} as const;

export const DEFAULT_MAIL_DATA: MailData = {
  headers: {
    subject: '',
    from: '',
    replyTo: '',
    to: '',
    cc: '',
    bcc: ''
  },
  failIfMissingAttachments: false,
  attachments: [] as string[],
  message: { body: '', contentType: MAIL_TYPE.plain },
  exceptionHandler: IVY_EXCEPTIONS.mail
} as const;

export const DEFAULT_TRIGGER_DATA: Pick<TriggerData, 'triggerable'> = {
  triggerable: false
} as const;

export const DEFAULT_REQUEST_DATA: RequestData = {
  request: {
    isHttpRequestable: true,
    linkName: '',
    isVisibleOnStartList: true,
    name: '',
    description: '',
    category: '',
    customFields: [] as StartCustomStartField[]
  },
  permission: {
    anonymous: true,
    role: 'Everybody',
    error: IVY_EXCEPTIONS.security
  }
} as const;

export const DEFAULT_DATA: ElementData = {
  ...DEFAULT_NAME_DATA,
  config: {
    ...DEFAULT_CALL_DATA,
    ...DEFAULT_OUTPUT_DATA,
    ...DEFAULT_TASK_DATA,
    ...DEFAULT_CASE_DATA,
    ...DEFAULT_END_PAGE_DATA,
    ...DEFAULT_CONDITION_DATA,
    ...DEFAULT_START_DATA,
    ...DEFAULT_RESULT_DATA,
    ...DEFAULT_ERROR_CATCH_DATA,
    ...DEFAULT_SIGNAL_CATCH_DATA,
    ...DEFAULT_MAIL_DATA,
    ...DEFAULT_TRIGGER_DATA,
    ...DEFAULT_REQUEST_DATA,
    // Other defaults, not implemented yet, but needed to satisfy TS
    body: {} as RestBody,
    query: {} as DbQuery,
    cache: {} as Cache,
    javaClass: '',
    userConfig: '',
    timeout: {} as JavaTimeout & JavaEventTimeout,
    guid: '',
    code: '',
    throws: {} as ErrorDefinition,
    link: '',
    clientId: '',
    operation: {} as SoapOperation,
    properties: {},
    exception: {} as SoapWsProcessException,
    eventId: '',
    method: 'GET',
    response: {} as RestResponse,
    target: {} as RestTarget
  }
} as const;
