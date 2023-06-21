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
  MailHeaderData
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

export const DEFAULT_MAIL_HEADER_DATA: MailHeaderData = {
  headers: {
    subject: '',
    from: '',
    replyTo: '',
    to: '',
    cc: '',
    bcc: ''
  }
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
    ...DEFAULT_MAIL_HEADER_DATA
  }
} as const;
