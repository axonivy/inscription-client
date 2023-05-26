import { Action, PID } from '@axonivy/inscription-protocol';

export namespace HighlightConnectorAction {
  export const KIND = 'highlightConnector';

  export function create(pid: PID): Action {
    return {
      kind: KIND,
      pid,
      payload: ''
    };
  }
}
