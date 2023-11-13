import { IVY_EXCEPTIONS } from '@axonivy/inscription-protocol';
import { useFieldset } from '../../../widgets';
import type { ExceptionItem, PathFieldsetProps } from '../../common';
import { ExceptionCombobox, PathFieldset } from '../../common';
import { useEditorContext, useMeta } from '../../../../context';
import { eventCodeInfo } from '../../../../utils/event-code';

type RestErrorProps = Omit<PathFieldsetProps, 'value' | 'onChange' | 'children'> & {
  value: string;
  onChange: (change: string) => void;
};

export const RestError = ({ label, path, value, onChange }: RestErrorProps) => {
  const { context } = useEditorContext();
  const items: ExceptionItem[] = [
    { value: IVY_EXCEPTIONS.rest, label: IVY_EXCEPTIONS.rest },
    { value: IVY_EXCEPTIONS.ignoreError, label: IVY_EXCEPTIONS.ignoreError },
    ...useMeta('meta/workflow/errorCodes', { context, thrower: true }, []).data.map(code => {
      return {
        value: code.eventCode,
        label: code.eventCode,
        info: eventCodeInfo(code)
      };
    })
  ];

  const fieldset = useFieldset();
  return (
    <PathFieldset label={label} path={path} {...fieldset.labelProps}>
      <ExceptionCombobox value={value} onChange={onChange} items={items} {...fieldset.inputProps} />
    </PathFieldset>
  );
};
