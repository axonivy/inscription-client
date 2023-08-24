import { Data } from './inscription';
import { ConfigData } from './inscription-data';

export type NameData = Omit<Data, 'config'>;

export type ProcessCallData = Pick<ConfigData, 'processCall'>;

export type DialogCallData = Pick<ConfigData, 'dialog'>;

export type CallData = Pick<ConfigData, 'call'>;

export type EndPageData = Pick<ConfigData, 'page'>;

export type OutputData = Pick<ConfigData, 'output' | 'sudo'>;

export type ConditionData = Pick<ConfigData, 'conditions'>;

export type TaskData = Pick<ConfigData, 'persistOnStart' | 'task' | 'tasks'>;

export type CaseData = Pick<ConfigData, 'case'>;

export type StartData = Pick<ConfigData, 'input' | 'signature'>;

export type ResultData = Pick<ConfigData, 'result'>;

export type ErrorCatchData = Pick<ConfigData, 'errorCode'>;

export type SignalCatchData = Pick<ConfigData, 'signalCode' | 'attachToBusinessCase'>;

export type MailData = Pick<ConfigData, 'headers' | 'failIfMissingAttachments' | 'attachments' | 'message' | 'exceptionHandler'>;

export type TriggerData = Pick<ConfigData, 'triggerable' | 'case' | 'task'>;

export type RequestData = Pick<ConfigData, 'request' | 'permission'>;

export type CodeData = Pick<ConfigData, 'code'>;

export type ErrorThrowData = Pick<ConfigData, 'throws'>;

export type QueryData = Pick<ConfigData, 'query' | 'exceptionHandler'>;
