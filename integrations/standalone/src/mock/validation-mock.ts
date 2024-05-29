import type { ElementData, ElementType, InscriptionSaveData, ValidationResult } from '@axonivy/inscription-protocol';

export namespace ValidationMock {
  export function validateData(type: ElementType, data: InscriptionSaveData): ValidationResult[] {
    switch (type) {
      case 'UserTask':
      case 'DialogCall':
        return validateDialogCallEditor(data.data);
      default:
        return [];
    }
  }

  const validateDialogCallEditor = (data: ElementData): ValidationResult[] => {
    const msgs: ValidationResult[] = [];
    msgs.push(...validateCaseData(data));
    msgs.push(...validateCallData(data));
    return msgs;
  };

  const validateCaseData = (data: ElementData): ValidationResult[] => {
    const msgs: ValidationResult[] = [];
    const name = data.config.case?.name;
    const desc = data.config.case?.description;
    if (name === undefined || name.length === 0) {
      msgs.push({ path: 'case.name', severity: 'ERROR', message: 'Name must not be empty' });
    }
    if (desc === undefined || desc.length === 0) {
      msgs.push({ path: 'case.description', severity: 'WARNING', message: 'Description is empty' });
    }
    return msgs;
  };

  const validateCallData = (data: ElementData): ValidationResult[] => {
    const msgs: ValidationResult[] = [];
    if (data.config.dialog === undefined || data.config.dialog.length === 0) {
      msgs.push({ path: 'dialog', severity: 'WARNING', message: 'No User Dialog specified, auto dialog will be shown.' });
      msgs.push({ path: 'call.map.param.procurementRequest', severity: 'WARNING', message: 'Unknown mapping' });
    }
    return msgs;
  };
}
