import { useMemo } from 'react';
import { generateId } from '../../../utils/utils.js';

export type FieldsetInputProps = {
  id: string;
  'aria-labelledby': string;
};

export type FieldsetLabelProps = {
  id: string;
  htmlFor: string;
};

type UseFieldsetReturnValue = {
  labelProps: FieldsetLabelProps;
  inputProps: FieldsetInputProps;
};

export function useFieldset(): UseFieldsetReturnValue {
  const id = useMemo(() => `fieldset-${generateId()}`, []);
  const labelId = `${id}-label`;
  const inputId = `${id}-input`;
  return { labelProps: { id: labelId, htmlFor: inputId }, inputProps: { id: inputId, 'aria-labelledby': labelId } };
}
