import { IVY_EXCEPTIONS } from '@axonivy/inscription-protocol';
import { useFieldset } from '../../../widgets';
import type { PathFieldsetProps } from '../../common';
import { PathFieldset } from '../../common';
import { useEditorContext, useMeta } from '../../../../context';
import { classifiedItemInfo } from '../../../../utils/event-code-categorie';
import { ExceptionCombobox, type ExceptionItem } from '../../common/exception-handler/ExceptionCombobox';

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
        info: classifiedItemInfo(code)
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
