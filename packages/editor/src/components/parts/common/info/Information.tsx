import type { DataUpdater } from '../../../../types/lambda';
import { MacroArea, MacroInput, useFieldset } from '../../../../components/widgets';
import { PathFieldset } from '../path/PathFieldset';
import { useEditorContext, useMeta, usePath } from '../../../../context';
import type { CategoryType } from '@axonivy/inscription-protocol';
import { IvyIcons } from '@axonivy/editor-icons';
import ClassificationCombobox, { type ClassifiedItem } from '../classification/ClassificationCombobox';
import { classifiedItemInfo } from '../../../../utils/event-code-categorie';

type InformationConfig = {
  name: string;
  description: string;
  category: string;
};

type InformationProps<T> = {
  config: InformationConfig;
  update: DataUpdater<T>;
};

const Information = <T extends InformationConfig>({ config, update }: InformationProps<T>) => {
  const nameFieldset = useFieldset();
  const descFieldset = useFieldset();
  const catFieldset = useFieldset();

  const { context } = useEditorContext();
  const path = usePath();

  const type = (): CategoryType => {
    const location = path.toLowerCase();
    if (location.includes('request') || location.includes('start')) {
      return 'START';
    }
    if (location.includes('case')) {
      return 'CASE';
    }
    if (location.includes('task')) {
      return 'TASK';
    }
    return '' as CategoryType;
  };
  const categories = [
    { value: '', label: '<< Empty >>', info: 'Select no Category' },
    ...useMeta('meta/workflow/categoryPaths', { context, type: type() }, []).data.map<ClassifiedItem>(categroy => {
      return { ...categroy, value: categroy.path, info: classifiedItemInfo(categroy) };
    })
  ];

  return (
    <>
      <PathFieldset label='Name' {...nameFieldset.labelProps} path='name'>
        <MacroInput
          value={config.name}
          browsers={['attr', 'func', 'cms']}
          onChange={change => update('name', change)}
          {...nameFieldset.inputProps}
        />
      </PathFieldset>
      <PathFieldset label='Description' {...descFieldset.labelProps} path='description'>
        <MacroArea
          value={config.description}
          browsers={['attr', 'func', 'cms']}
          onChange={change => update('description', change)}
          {...descFieldset.inputProps}
        />
      </PathFieldset>
      <PathFieldset label='Category' {...catFieldset.labelProps} path='category'>
        <ClassificationCombobox
          value={config.category}
          onChange={change => update('category', change)}
          data={categories}
          icon={IvyIcons.Label}
          comboboxInputProps={catFieldset.inputProps}
          withBrowser={true}
        />
      </PathFieldset>
    </>
  );
};

export default Information;
