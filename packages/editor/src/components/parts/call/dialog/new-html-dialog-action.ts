import { Action, PID } from '@axonivy/inscription-protocol';

export namespace NewHtmlDialogAction {
  export const KIND = 'newHtmlDialog';

  export function create(pid: PID): Action {
    return {
      kind: KIND,
      pid,
      payload: ''
    };
  }
}
