import { DataUpdater } from '../../../../types/lambda';
import { MacroArea, MacroInput, useFieldset } from '../../../../components/widgets';
import { PathFieldset } from '../path/PathFieldset';

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

  return (
    <>
      <PathFieldset label='Name' {...nameFieldset.labelProps} path='name'>
        <MacroInput value={config.name} onChange={change => update('name', change)} {...nameFieldset.inputProps} />
      </PathFieldset>
      <PathFieldset label='Description' {...descFieldset.labelProps} path='description'>
        <MacroArea value={config.description} onChange={change => update('description', change)} {...descFieldset.inputProps} />
      </PathFieldset>
      <PathFieldset label='Category' {...catFieldset.labelProps} path='category'>
        <MacroInput value={config.category} onChange={change => update('category', change)} {...catFieldset.inputProps} />
      </PathFieldset>
    </>
  );
};

export default Information;
