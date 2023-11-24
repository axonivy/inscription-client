import { MappingPart, PathFieldset } from '../../../common/index.js';
import { useRestRequestData } from '../../useRestRequestData.js';
import { ScriptArea, useFieldset } from '../../../../widgets/index.js';
import { useMeta, PathContext, useEditorContext } from '../../../../../context/index.js';
import { RestEntityTypeCombobox, useShowRestEntityTypeCombo } from '../../RestEntityTypeCombobox.js';
import { useRestEntityTypeMeta, useRestResourceMeta } from '../../useRestResourceMeta.js';
import { EMPTY_VAR_INFO } from '@axonivy/inscription-protocol';

const useShowEntityTypeCombo = (types: string[], currentType: string) => {
  const resource = useRestResourceMeta();
  return useShowRestEntityTypeCombo(types, currentType, resource?.method?.inBody);
};

export const RestEntity = () => {
  const { config, updateEntity } = useRestRequestData();
  const { context } = useEditorContext();
  const variableInfo = useMeta('meta/rest/entityInfo', { context, fullQualifiedName: config.body.entity.type }, EMPTY_VAR_INFO).data;
  const entityTypes = useRestEntityTypeMeta('entity');
  const showEntityType = useShowEntityTypeCombo(entityTypes, config.body.entity.type);
  const typeFieldset = useFieldset();
  const codeFieldset = useFieldset();
  return (
    <PathContext path='entity'>
      {showEntityType && (
        <PathFieldset label='Entity-Type' path='type' {...typeFieldset.labelProps}>
          <RestEntityTypeCombobox
            value={config.body.entity.type}
            onChange={change => updateEntity('type', change)}
            items={entityTypes}
            {...typeFieldset.inputProps}
          />
        </PathFieldset>
      )}
      <MappingPart
        browsers={['attr', 'func', 'type']}
        data={config.body.entity.map}
        onChange={change => updateEntity('map', change)}
        variableInfo={variableInfo}
      />
      <PathFieldset label='Code' path='code' {...codeFieldset.labelProps}>
        <ScriptArea
          value={config.body.entity.code}
          onChange={change => updateEntity('code', change)}
          browsers={['attr', 'func', 'type']}
          {...codeFieldset.inputProps}
        />
      </PathFieldset>
    </PathContext>
  );
};
