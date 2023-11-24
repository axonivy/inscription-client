import { Radio } from '../../../../../components/widgets/index.js';
import { PathCollapsible } from '../../../common/index.js';
import { useRestRequestData } from '../../useRestRequestData.js';
import type { InputType} from '@axonivy/inscription-protocol';
import { REST_INPUT_TYPES } from '@axonivy/inscription-protocol';
import { RestBodyRaw } from './RestBodyRaw.js';
import { RestContentType } from './RestContentType.js';
import { RestForm } from './RestForm.js';
import { RestEntity } from './RestEntity.js';
import { deepEqual } from '../../../../../utils/equals.js';
import { useOpenApi } from '../../../../../context/index.js';
import type { RadioItemProps } from '../../../../../components/widgets/radio/Radio.js';
import { useRestResourceMeta } from '../../useRestResourceMeta.js';
import { isFormMedia } from '../../known-types.js';

export const useBodyTypes = (currentType: InputType): RadioItemProps<InputType>[] => {
  const { openApi } = useOpenApi();
  const resource = useRestResourceMeta();
  let types = Object.entries(REST_INPUT_TYPES);
  if (openApi && resource.method) {
    const isFormSelected = currentType === 'FORM';
    const isFormSpec = isFormMedia(resource.method?.inBody?.media);
    if (isFormSelected && isFormSpec) {
      // no other type is valid
      return [];
    }
    if (!isFormSelected) {
      types = types.filter(entry => entry[1] !== 'Form');
    }
  }
  return types.map(([key, value]) => ({ label: value, value: key as InputType }));
};

export const RestBody = () => {
  const { config, defaultConfig, updateBody } = useRestRequestData();
  const radioItems = useBodyTypes(config.body.type);

  const bodyType = (type: InputType) => {
    switch (type) {
      case 'ENTITY':
        return <RestEntity />;
      case 'FORM':
        return <RestForm />;
      case 'RAW':
        return <RestBodyRaw />;
    }
  };

  return (
    <PathCollapsible label='Body' path='body' defaultOpen={!deepEqual(config.body, defaultConfig.body)}>
      {radioItems.length > 0 && (
        <Radio value={config.body.type} onChange={change => updateBody('type', change)} items={radioItems} orientation='horizontal' />
      )}
      {bodyType(config.body.type)}
      <RestContentType />
    </PathCollapsible>
  );
};
