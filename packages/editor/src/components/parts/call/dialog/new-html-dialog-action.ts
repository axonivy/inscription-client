import { InscriptionAction, PID } from '@axonivy/inscription-protocol';

export namespace NewHtmlDialogAction {
  export const KIND = 'newHtmlDialog';

  export function create(pid: PID): InscriptionAction {
    return {
      kind: KIND,
      pid,
      payload: ''
    };
  }
}
