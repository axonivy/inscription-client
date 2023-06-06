import { Data, ElementAlternative, ElementScript, ScriptMapCode, ScriptParameterizedMapCode, WfCase, WfTask } from './inscription';

export type NameData = Omit<Data, 'config'>;

export type ProcessCallData = {
  processCall: string;
};

export type DialogCallData = {
  dialog: string;
};

export type MappingData = ScriptMapCode;
export type Mapping = MappingData['map'];

export type CallData = {
  call: MappingData;
};

export interface EndPageData {
  page: string;
}

export type OutputData = ElementScript;

export type ConditionData = ElementAlternative;

export interface TaskData {
  task: WfTask;
  tasks: WfTask[];
  persist: boolean;
}

export interface CaseData {
  case: WfCase;
}

export interface StartData {
  input: ScriptParameterizedMapCode;
  signature: string;
}

export interface ResultData {
  result: ScriptParameterizedMapCode;
}

export interface ErrorCatchData {
  errorCode: string;
}

export interface SignalCatchData {
  signalCode: string;
  attachToBusinessCase: boolean;
}
