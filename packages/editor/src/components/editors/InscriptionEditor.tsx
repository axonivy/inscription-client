import type { ReactNode } from 'react';
import { memo } from 'react';
import './InscriptionEditor.css';
import type { ElementType } from '@axonivy/inscription-protocol';
import NoEditor from './NoEditor';
import { activityEditors } from './activity/all-activity-editors';
import { eventEditors } from './event/all-event-editors';
import { gatewayEditors } from './gateway/all-gateway-editors';
import { IvyIcon, MessageText } from '../widgets';
import { useDataContext, useEditorContext } from '../../context';
import type { IvyIcons } from '@axonivy/editor-icons';
import { useGeneralData } from '../parts/name/useGeneralData';
import Part from './part/Part';
import type { PartProps } from './part/usePart';
import { otherEditors } from './other-editors';

const editors = new Map<ElementType, ReactNode>([...eventEditors, ...gatewayEditors, ...activityEditors, ...otherEditors]);

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
  const { data } = useGeneralData();
  const validations = useDataContext().validations.filter(val => val.path.length === 0);
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
        <Part parts={props.parts} />
      </div>
    </div>
  );
};

export default memo(InscriptionEditor);
