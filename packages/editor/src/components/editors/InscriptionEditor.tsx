import { Separator } from '@radix-ui/react-separator';
import { memo, ReactNode, useMemo, useState } from 'react';
import './InscriptionEditor.css';
import { InscriptionEditorType } from '@axonivy/inscription-protocol';
import NoEditor from './NoEditor';
import { activityEditors } from './activity/all-activity-editors';
import { eventEditors } from './event/all-event-editors';
import { gatewayEditors } from './gateway/all-gateway-editors';
import { otherEditors } from './others/other-editors';
import { ErrorFallback, IvyIcon, TabContent, TabList, TabRoot } from '../widgets';
import { useDataContext, useEditorContext } from '../../context';
import { IvyIcons } from '@axonivy/editor-icons';
import { Message, TabProps } from '../props';
import { ErrorBoundary } from 'react-error-boundary';

const editors = new Map<InscriptionEditorType, ReactNode>([...eventEditors, ...gatewayEditors, ...activityEditors, ...otherEditors]);

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
  const { data, validation } = useDataContext();
  const headerState = useMemo<Message[]>(() => {
    if (validation.length > 0) {
      return validation;
    }
    return [{ severity: 'info', message: data.name ?? '' }];
  }, [data.name, validation]);

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
  const [tab, setTab] = useState<string>();
  return (
    <div className='editor'>
      <TabRoot {...props} value={tab} onValueChange={setTab}>
        <Header {...props} />
        <Separator className='separator-root' style={{ margin: '15px 0' }} />
        <ErrorBoundary FallbackComponent={ErrorFallback} resetKeys={[tab]}>
          <TabContent {...props} />
        </ErrorBoundary>
      </TabRoot>
    </div>
  );
};

export default memo(InscriptionEditor);
