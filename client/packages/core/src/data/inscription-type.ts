// prettier-ignore
export namespace EventEditorType {
  export type Start = 'RequestStart' | 'SignalStartEvent' | 'ProgramStart' | 'ErrorStartEvent';
  export type Intermediate = 'TaskSwitchEvent' | 'WaitEvent';
  export type End = 'TaskEnd' | 'TaskEndPage' | 'ErrorEnd';
  export type Boundary = 'ErrorBoundaryEvent' | 'SignalBoundaryEvent';
  export type Webservice = 'WebserviceStart' | 'WebserviceEnd';
  export type CallSub = 'CallSubStart' | 'CallSubEnd';
  export type Embedded = 'EmbeddedStart' | 'EmbeddedEnd';
  export type HtmlDialog = 'HtmlDialogStart' | 'HtmlDialogMethodStart' | 'HtmlDialogEventStart' | 'HtmlDialogEnd' | 'HtmlDialogExit';
  export type All = Start | Intermediate | End | Boundary | Webservice | CallSub | Embedded | HtmlDialog;
}

// prettier-ignore
export type GatewayEditorType = 'Alternative' | 'Split' | 'Join' | 'TaskSwitchGateway';

// prettier-ignore
export namespace ActivityEditorType {
  export type General = 'UserTask' | 'DialogCall' | 'Script' | 'EmbeddedProcessElement' | 'SubProcessCall' | 'TriggerCall';
  export type Interface = 'Database' | 'WebServiceCall' | 'RestClientCall' | 'EMail' | 'ProgramInterface';
  export type Bpmn = 'GenericBpmnElement' | 'UserBpmnElement' | 'ManualBpmnElement' | 'ScriptBpmnElement' | 'ServiceBpmnElement' | 'RuleBpmnElement' | 'SendBpmnElement' | 'ReceiveBpmnElement';
  export type All = General | Interface | Bpmn;
}

export type OtherEditorType = 'ProcessAnnotation' | 'Unknown';

export type InscriptionEditorType = EventEditorType.All | GatewayEditorType | ActivityEditorType.All | OtherEditorType;

export interface InscriptionType {
  id: InscriptionEditorType;
  label: string;
  shortLabel: string;
  description: string;
  iconId: string;
}
