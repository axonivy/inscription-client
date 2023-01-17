import { Separator } from '@radix-ui/react-separator';
import { memo, ReactNode, useMemo } from 'react';
import './InscriptionEditor.css';
import { InscriptionEditorType } from '@axonivy/inscription-protocol';
import NoEditor from './NoEditor';
import { activityEditors } from './activity/all-activity-editors';
import { eventEditors } from './event/all-event-editors';
import { gatewayEditors } from './gateway/all-gateway-editors';
import { otherEditors } from './others/other-editors';
import { IvyIcon, TabContent, TabList, TabRoot } from '../widgets';
import { useData, useDataContext, useEditorContext } from '../../context';
import { IvyIcons } from '@axonivy/editor-icons';
import { Message, TabProps } from '../props';

const editors = new Map<InscriptionEditorType, JSX.Element>([...eventEditors, ...gatewayEditors, ...activityEditors, ...otherEditors]);

export const inscriptionEditor = (type?: InscriptionEditorType): ReactNode => {
  if (type) {
    return editors.get(type) ?? <NoEditor type={type} />;
  }
  return <NoEditor />;
};

export interface EditorProps {
  icon: IvyIcons;
  tabs: TabProps[];
}

const Header = (props: EditorProps) => {
  const [, name] = useData('name');
  const { validation } = useDataContext();
  const headerState = useMemo<Message[]>(() => {
    if (validation.length > 0) {
      return validation;
    }
    return [{ severity: 'info', message: name }];
  }, [name, validation]);

  const editorContext = useEditorContext();
  return (
    <>
      <div className='header'>
        <div className='header-title'>
          <div className='header-editor'>{editorContext.type.shortLabel}</div>
        </div>
        <TabList {...props} />
        <IvyIcon icon={props.icon} />
      </div>
      {headerState.map((state, index) => (
        <div key={index} className={`header-status message-${state.severity}`}>
          <IvyIcon icon={state.severity} />
          {state.message}
        </div>
      ))}
    </>
  );
};

const InscriptionEditor = (props: EditorProps) => {
  return (
    <div className='editor'>
      <TabRoot {...props}>
        <Header {...props} />
        <Separator className='separator-root' style={{ margin: '15px 0' }} />
        <TabContent {...props} />
      </TabRoot>
    </div>
  );
};

export default memo(InscriptionEditor);
