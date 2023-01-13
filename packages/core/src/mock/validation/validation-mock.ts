import { InscriptionSaveData, InscriptionValidation } from '@axonivy/inscription-protocol';
import { CallData, NameData } from '../data';

export namespace ValiationMock {
  export function validateData(data: InscriptionSaveData): InscriptionValidation[] {
    switch (data.type) {
      case 'UserTask':
      case 'DialogCall':
        return validateDialogCallEditor(data.data);
      default:
        return [];
    }
  }

  function validateDialogCallEditor(data: any): InscriptionValidation[] {
    const msgs: InscriptionValidation[] = [];
    msgs.push(...validateNameData(data));
    msgs.push(...validateCallData(data));
    return msgs;
  }

  function validateNameData(data: NameData): InscriptionValidation[] {
    const msgs: InscriptionValidation[] = [];
    if (data.name.length === 0) {
      msgs.push({ path: 'name', severity: 'error', message: 'Display name must not be empty' });
    }
    if (data.description.length === 0) {
      msgs.push({ path: 'description', severity: 'warning', message: 'Description is empty' });
    }
    return msgs;
  }

  function validateCallData(data: CallData): InscriptionValidation[] {
    const msgs: InscriptionValidation[] = [];
    if (data.config.dialog.length === 0) {
      msgs.push({ path: 'config/dialog', severity: 'warning', message: 'No User Dialog specified, auto dialog will be shown.' });
    }
    return msgs;
  }
}
