import { EditorData, Label, Script, Text, Widget } from '@axonivy/inscription-protocol';
import { PartProps, usePartDirty, usePartState } from '../../../editors';
import { useEditorContext, useMeta, useValidations } from '../../../../context';
import { useEditorData } from './useEditorData';
import { Input, MessageText, ScriptInput } from '../../../../components/widgets';
import './Editor.css';

export function useEditorPart(): PartProps {
  const { config, defaultConfig, initConfig, reset } = useEditorData();
  const compareData = (data: EditorData) => [data.userConfig];
  const validation = useValidations(['userConfig']);
  const state = usePartState(compareData(defaultConfig), compareData(config), validation);
  const dirty = usePartDirty(compareData(initConfig), compareData(config));
  return {
    name: 'Editor',
    state,
    reset: { dirty, action: () => reset() },
    content: <EditorPart />
  };
}

const EditorPart = () => {
  const { config, update } = useEditorData();
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
              <p key={index}>{sentence.trim()}</p>
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
          value={config.userConfig}
          onChange={change => update('userConfig', change)}
          browsers={['attr', 'func', 'datatype', 'cms']}
        />
      );
    }
    if (isText(widget)) {
      return <Input value={config.userConfig} onChange={change => update('userConfig', change)} />;
    }
    return null;
  };

  if (editorItems.length === 0) {
    return <MessageText message={{ severity: 'WARNING', message: 'There is no editor for this bean' }} />;
  }

  return (
    <>
      {editorItems.map((widget, index) => (
        <div key={index}>{renderWidgetComponent(widget)}</div>
      ))}
    </>
  );
};
