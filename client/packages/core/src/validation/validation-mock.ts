import { InscriptionValidation } from '.';
import { CallData, InscriptionSaveData, NameData, UserDialogData } from '../data';

export function validateInscriptionData(data: InscriptionSaveData): InscriptionValidation[] {
  switch (data.type) {
    case 'UserDialog':
      return validateUserDialogEditor(data.data);
    default:
      return [];
  }
}

export function validateUserDialogEditor(data: UserDialogData): InscriptionValidation[] {
  const msgs: InscriptionValidation[] = [];
  msgs.push(...validateNameData(data.nameData));
  msgs.push(...validateCallData(data.callData));
  return msgs;
}

export function validateNameData(data: NameData): InscriptionValidation[] {
  const msgs: InscriptionValidation[] = [];
  if (data.displayName.length === 0) {
    msgs.push({ path: 'nameData/displayName', severity: 'error', message: '🚫 Display name must not be empty' });
  }
  if (data.description.length === 0) {
    msgs.push({ path: 'nameData/description', severity: 'warning', message: '⚠️ Description is empty' });
  }
  return msgs;
}

export function validateCallData(data: CallData): InscriptionValidation[] {
  const msgs: InscriptionValidation[] = [];
  if (data.dialogStart.length === 0) {
    msgs.push({ path: 'callData/dialogStart', severity: 'warning', message: '⚠️ No User Dialog specified, auto dialog will be shown.' });
  }
  return msgs;
}
