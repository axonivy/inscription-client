import { ElementData, ElementType, InscriptionSaveData, InscriptionValidation } from '@axonivy/inscription-protocol';

export namespace ValidationMock {
  export function validateData(type: ElementType, data: InscriptionSaveData): InscriptionValidation[] {
    switch (type) {
      case 'UserTask':
      case 'DialogCall':
        return validateDialogCallEditor(data.data);
      default:
        return [];
    }
  }

  function validateDialogCallEditor(data: any): InscriptionValidation[] {
    const msgs: InscriptionValidation[] = [];
    msgs.push(...validateCaseData(data));
    msgs.push(...validateCallData(data));
    return msgs;
  }

  function validateCaseData(data: ElementData): InscriptionValidation[] {
    const msgs: InscriptionValidation[] = [];
    const name = data.config.case?.name;
    const desc = data.config.case?.description;
    if (name === undefined || name.length === 0) {
      msgs.push({ path: 'case.name', severity: 'ERROR', message: 'Name must not be empty' });
    }
    if (desc === undefined || desc.length === 0) {
      msgs.push({ path: 'case.description', severity: 'WARNING', message: 'Description is empty' });
    }
    return msgs;
  }

  function validateCallData(data: ElementData): InscriptionValidation[] {
    const msgs: InscriptionValidation[] = [];
    if (data.config.dialog === undefined || data.config.dialog.length === 0) {
      msgs.push({ path: 'dialog', severity: 'WARNING', message: 'No User Dialog specified, auto dialog will be shown.' });
    }
    return msgs;
  }
}
