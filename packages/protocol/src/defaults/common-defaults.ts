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
  IVY_EXCEPTIONS
} from '../data';
import { DEFAULT_TASK_DATA, DEFAULT_CASE_DATA, TRIGGER_DATA } from './workflow-defaults';

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
};

export const DEFAULT_CONDITION_DATA: ConditionData = {
  conditions: {}
};

export const DEFAULT_START_DATA: StartData = {
  signature: '',
  input: {
    code: '',
    map: {},
    params: [] as ScriptVariable[]
  }
};

export const DEFAULT_RESULT_DATA: ResultData = {
  result: {
    code: '',
    map: {},
    params: [] as ScriptVariable[]
  }
};

export const DEFAULT_ERROR_CATCH_DATA: ErrorCatchData = {
  errorCode: ''
};

export const DEFAULT_SIGNAL_CATCH_DATA: SignalCatchData = {
  signalCode: '',
  attachToBusinessCase: true
};

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
  attachments: [],
  message: { body: '', contentType: MAIL_TYPE.plain },
  exceptionHandler: IVY_EXCEPTIONS.mail
};

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
    ...TRIGGER_DATA
  }
} as const;
