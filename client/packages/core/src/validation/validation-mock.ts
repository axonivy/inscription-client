import { InscriptionValidation } from '.';
import { InscriptionSaveData, CallData, NameData } from '../data';

export function validateInscriptionData(data: InscriptionSaveData): InscriptionValidation[] {
  switch (data.type) {
    case 'UserTask':
    case 'DialogCall':
      return validateUserDialogEditor(data.data);
    default:
      return [];
  }
}

export function validateUserDialogEditor(data: any): InscriptionValidation[] {
  const msgs: InscriptionValidation[] = [];
  msgs.push(...validateNameData(data));
  msgs.push(...validateCallData(data));
  return msgs;
}

export function validateNameData(data: NameData): InscriptionValidation[] {
  const msgs: InscriptionValidation[] = [];
  if (data.name.length === 0) {
    msgs.push({ path: 'name', severity: 'error', message: 'Display name must not be empty' });
  }
  if (data.description.length === 0) {
    msgs.push({ path: 'description', severity: 'warning', message: 'Description is empty' });
  }
  return msgs;
}

export function validateCallData(data: CallData): InscriptionValidation[] {
  const msgs: InscriptionValidation[] = [];
  if (data.config.dialog.length === 0) {
    msgs.push({ path: 'config/dialog', severity: 'warning', message: 'No User Dialog specified, auto dialog will be shown.' });
  }
  return msgs;
}
