import { Radio } from '../../../../../components/widgets';
import { PathCollapsible } from '../../../common';
import { useRestRequestData } from '../../useRestRequestData';
import { InputType, REST_INPUT_TYPES } from '@axonivy/inscription-protocol';
import { RestBodyRaw } from './RestBodyRaw';
import { RestContentType } from './RestContentType';
import { RestForm } from './RestForm';
import { RestEntity } from './RestEntity';
import { deepEqual } from '../../../../../utils/equals';

export const RestBody = () => {
  const { config, defaultConfig, updateBody } = useRestRequestData();

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
      <Radio
        value={config.body.type}
        onChange={change => updateBody('type', change)}
        items={Object.entries(REST_INPUT_TYPES).map(([key, value]) => ({ label: value, value: key as InputType }))}
        orientation='horizontal'
      />
      {bodyType(config.body.type)}
      <RestContentType />
    </PathCollapsible>
  );
};
