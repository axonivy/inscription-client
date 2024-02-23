import type { ComboboxItem, FieldsetControl } from '../../../components/widgets';
import { Combobox, useFieldset } from '../../../components/widgets';
import { useAction, useEditorContext, useMeta } from '../../../context';
import type { Consumer } from '../../../types/lambda';
import { PathFieldset } from '../common';
import type { Type } from '@axonivy/inscription-protocol';
import { IvyIcons } from '@axonivy/ui-icons';

type JavaClassSelectorProps = {
  javaClass: string;
  onChange: Consumer<string>;
  type: Type;
};

const JavaClassSelector = ({ javaClass, onChange, type }: JavaClassSelectorProps) => {
  const { context } = useEditorContext();
  const javaClassItems = useMeta('meta/program/types', { type: type, context }, []).data.map<ComboboxItem>(javaClass => ({
    value: javaClass.fullQualifiedName
  }));

  const newAction = useAction('newProgram');
  const openAction = useAction('openProgram');
  const openJavaClassConfig: FieldsetControl = {
    label: 'Open Java Class config',
    icon: IvyIcons.GoToSource,
    action: () => openAction(javaClass)
  };
  const createJavaClass: FieldsetControl = { label: 'Create new Java Class', icon: IvyIcons.Plus, action: () => newAction() };

  const javaClassField = useFieldset();

  return (
    <PathFieldset label='Java Class' {...javaClassField.labelProps} path='javaClass' controls={[openJavaClassConfig, createJavaClass]}>
      <Combobox value={javaClass} onChange={item => onChange(item)} items={javaClassItems} {...javaClassField.inputProps} />
    </PathFieldset>
  );
};

export default JavaClassSelector;
