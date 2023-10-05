import { Combobox, ComboboxItem, useFieldset } from '../../../components/widgets';
import { useEditorContext, useMeta } from '../../../context';
import { Consumer } from '../../../types/lambda';
import { PathFieldset } from '../common';
import { Type } from '@axonivy/inscription-protocol';

type JavaClassSelectorProps = {
  config: string;
  onChange: Consumer<string>;
  type: Type;
};

const JavaClassSelector = ({ config, onChange, type }: JavaClassSelectorProps) => {
  const { context } = useEditorContext();
  const javaClassItems = useMeta('meta/program/types', { type: type, context }, []).data.map<ComboboxItem>(javaClass => ({
    value: javaClass.fullQualifiedName
  }));

  const javaClassField = useFieldset();

  return (
    <PathFieldset label='Java Class' {...javaClassField.labelProps} path='javaClass'>
      <Combobox value={config} onChange={item => onChange(item)} items={javaClassItems} {...javaClassField.inputProps} />
    </PathFieldset>
  );
};

export default JavaClassSelector;
