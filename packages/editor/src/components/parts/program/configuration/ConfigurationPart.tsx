import type { ConfigurationData, Label, Script, Text, Widget } from '@axonivy/inscription-protocol';
import type { PartProps } from '../../../editors/index.js';
import { usePartDirty, usePartState } from '../../../editors/index.js';
import { useMeta, useEditorContext, useValidations } from '../../../../context/index.js';
import { useConfigurationData } from './useConfigurationData.js';
import { Input, MessageText, ScriptInput } from '../../../widgets/index.js';
import './Configuration.css';

export function useConfigurationPart(): PartProps {
  const { config, defaultConfig, initConfig, reset } = useConfigurationData();
  const compareData = (data: ConfigurationData) => [data.userConfig];
  const validation = useValidations(['userConfig']);
  const state = usePartState(compareData(defaultConfig), compareData(config), validation);
  const dirty = usePartDirty(compareData(initConfig), compareData(config));
  return {
    name: 'Configuration',
    state,
    reset: { dirty, action: () => reset() },
    content: <ConfigurationPart />
  };
}

const ConfigurationPart = () => {
  const { config, updateUserConfig } = useConfigurationData();
  const { context } = useEditorContext();
  const editorItems = useMeta('meta/program/editor', { context, type: config.javaClass }, []).data;

  function isLabel(object: Widget): object is Label {
    return 'text' in object;
  }

  function isScript(object: Widget): object is Script {
    return 'requiredType' in object;
  }

  function isText(object: Widget): object is Text {
    return !isLabel(object) && !isScript(object);
  }

  const renderWidgetComponent = (widget: Widget) => {
    if (isLabel(widget)) {
      const message = widget.text;

      if (widget.multiline) {
        const sentences = message.split('\n');
        return (
          <div className='info-text'>
            {sentences.map((sentence, index) => (
              <p key={index}>{sentence}</p>
            ))}
          </div>
        );
      } else {
        return <div className='info-text'>{message}</div>;
      }
    }
    if (isScript(widget)) {
      return (
        <ScriptInput
          type={widget.requiredType}
          value={config.userConfig[widget.configKey]}
          onChange={change => updateUserConfig(widget.configKey, change)}
          browsers={['attr', 'func', 'type', 'cms']}
        />
      );
    }
    if (isText(widget)) {
      return (
        <Input
          value={config.userConfig[widget.configKey]}
          aria-label={widget.configKey}
          onChange={change => updateUserConfig(widget.configKey, change)}
        />
      );
    }
    return null;
  };

  if (editorItems.length === 0) {
    return <MessageText message={{ severity: 'INFO', message: 'No configuration needed' }} />;
  }

  return (
    <>
      {editorItems.map((widget, index) => (
        <div className='configuration-widget' key={index}>
          {renderWidgetComponent(widget)}
        </div>
      ))}
    </>
  );
};
