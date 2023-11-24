import type { ComboboxItem, FieldsetControl } from '../../../components/widgets/index.js';
import { Combobox, useFieldset } from '../../../components/widgets/index.js';
import { useMeta, useAction, useEditorContext } from '../../../context/index.js';
import type { Consumer } from '../../../types/lambda.js';
import { PathFieldset } from '../common/index.js';
import type { Type } from '@axonivy/inscription-protocol';
import { IvyIcons } from '@axonivy/editor-icons';

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
