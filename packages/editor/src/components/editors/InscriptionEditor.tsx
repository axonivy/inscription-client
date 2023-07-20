import { memo, ReactNode } from 'react';
import './InscriptionEditor.css';
import { ElementType } from '@axonivy/inscription-protocol';
import NoEditor from './NoEditor';
import { activityEditors } from './activity/all-activity-editors';
import { eventEditors } from './event/all-event-editors';
import { gatewayEditors } from './gateway/all-gateway-editors';
import { IvyIcon, Accordion, MessageText } from '../widgets';
import { useDataContext, useEditorContext } from '../../context';
import { IvyIcons } from '@axonivy/editor-icons';
import { PartProps } from '../props';
import DropdownMenu from './menu/HeaderMenu';
import { useNameData } from '../parts/name/useNameData';

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
  const { data } = useNameData();
  const { validations } = useDataContext();
  const editorContext = useEditorContext();
  return (
    <>
      <div className='header'>
        <div className='header-left'>
          <IvyIcon icon={props.icon} />
          <div className='header-title'>
            {editorContext.type.shortLabel}
            {data.name.length > 0 && ` - ${data.name}`}
          </div>
        </div>
        <div className='header-right'>
          <div className='header-search'>
            <IvyIcon icon={IvyIcons.Search} />
            <span>Search</span>
          </div>
          <DropdownMenu />
        </div>
      </div>
      {validations.length > 0 && (
        <div className='header-messages'>
          {validations.map((validaiton, index) => (
            <MessageText key={index} message={validaiton} />
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
