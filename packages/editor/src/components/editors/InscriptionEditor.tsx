import { memo, ReactNode } from 'react';
import './InscriptionEditor.css';
import { ElementType } from '@axonivy/inscription-protocol';
import NoEditor from './NoEditor';
import { activityEditors } from './activity/all-activity-editors';
import { eventEditors } from './event/all-event-editors';
import { gatewayEditors } from './gateway/all-gateway-editors';
import { IvyIcon, Accordion } from '../widgets';
import { useDataContext, useEditorContext } from '../../context';
import { IvyIcons } from '@axonivy/editor-icons';
import { PartProps } from '../props';
import Button from '../widgets/button/Button';

const editors = new Map<ElementType, ReactNode>([...eventEditors, ...gatewayEditors, ...activityEditors]);

export const inscriptionEditor = (type?: ElementType): ReactNode => {
  if (type) {
    return editors.get(type) ?? <NoEditor type={type} />;
  }
  return <NoEditor />;
};

export interface EditorProps {
  icon: IvyIcons;
  parts: PartProps[];
}

const Header = (props: EditorProps) => {
  const { validation } = useDataContext();
  const editorContext = useEditorContext();
  return (
    <>
      <div className='header'>
        <div className='header-left'>
          <IvyIcon icon={props.icon} />
          <div className='header-title'>{editorContext.type.shortLabel}</div>
        </div>
        <div className='header-right'>
          <div className='header-search'>
            <IvyIcon icon={IvyIcons.Search} />
            <span>Search</span>
          </div>
          <Button icon={IvyIcons.AllElements} />
        </div>
      </div>
      {validation.length > 0 && (
        <div className='header-messages'>
          {validation.map((state, index) => (
            <div key={index} className={`header-status message-${state.severity.toString().toLowerCase()}`}>
              <IvyIcon icon={state.severity} />
              {state.message}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

const InscriptionEditor = (props: EditorProps) => {
  return (
    <div className='editor'>
      <Header {...props} />
      <div className='content'>
        {props.parts.map((part, index) => (
          <Accordion key={`${index}-${part.name}`} part={part} />
        ))}
      </div>
    </div>
  );
};

export default memo(InscriptionEditor);
