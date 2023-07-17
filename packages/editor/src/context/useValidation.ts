import { InscriptionValidation, SchemaKeys } from '@axonivy/inscription-protocol';
import { useDataContext } from './useDataContext';
import { useFullPath, usePath } from './usePath';

export function useValidations(path?: SchemaKeys): InscriptionValidation[] {
  const { validations } = useDataContext();
  const fullLocation = useFullPath(path);
  return validations.filter(val => val.path.startsWith(fullLocation));
}

export function useValidation(): InscriptionValidation | undefined {
  const { validations } = useDataContext();
  const location = usePath();
  return validations.find(val => val.path === location);
}
