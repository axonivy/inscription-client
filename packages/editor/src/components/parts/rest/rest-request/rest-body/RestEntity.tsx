import { MappingPart, PathFieldset } from '../../../common';
import { useRestRequestData } from '../../useRestRequestData';
import { ScriptArea, useFieldset } from '../../../../widgets';
import { PathContext, useEditorContext, useMeta } from '../../../../../context';
import { RestEntityTypeCombobox, useShowRestEntityTypeCombo } from '../../RestEntityTypeCombobox';
import { useRestEntityTypeMeta, useRestResourceMeta } from '../../useRestResourceMeta';
import { EMPTY_VAR_INFO } from '@axonivy/inscription-protocol';
import useMaximizedCodeEditor from '../../../../browser/useMaximizedCodeEditor';

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
  const { maximizeState, maximizeCode } = useMaximizedCodeEditor();
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
      <PathFieldset label='Code' path='code' {...codeFieldset.labelProps} controls={[maximizeCode]}>
        <ScriptArea
          maximizeState={maximizeState}
          value={config.body.entity.code}
          onChange={change => updateEntity('code', change)}
          browsers={['attr', 'func', 'type']}
          {...codeFieldset.inputProps}
        />
      </PathFieldset>
    </PathContext>
  );
};
