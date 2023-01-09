import { InscriptionValidation } from '.';
import { InscriptionSaveData, DialogCallData, NameDataAccess, CallDataAccess } from '../data';

export function validateInscriptionData(data: InscriptionSaveData): InscriptionValidation[] {
  switch (data.type) {
    case 'DialogCall':
      return validateUserDialogEditor(data.data);
    default:
      return [];
  }
}

export function validateUserDialogEditor(data: DialogCallData): InscriptionValidation[] {
  const msgs: InscriptionValidation[] = [];
  msgs.push(...validateNameData(data));
  msgs.push(...validateCallData(data));
  return msgs;
}

export function validateNameData(data: NameDataAccess): InscriptionValidation[] {
  const msgs: InscriptionValidation[] = [];
  if (data.name.length === 0) {
    msgs.push({ path: 'name', severity: 'error', message: '🚫 Display name must not be empty' });
  }
  if (data.description.length === 0) {
    msgs.push({ path: 'description', severity: 'warning', message: '⚠️ Description is empty' });
  }
  return msgs;
}

export function validateCallData(data: CallDataAccess): InscriptionValidation[] {
  const msgs: InscriptionValidation[] = [];
  if (data.config.dialog.length === 0) {
    msgs.push({ path: 'config/dialog', severity: 'warning', message: '⚠️ No User Dialog specified, auto dialog will be shown.' });
  }
  return msgs;
}
