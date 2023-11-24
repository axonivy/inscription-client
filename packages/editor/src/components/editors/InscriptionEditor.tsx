import type { ReactNode } from 'react';
import { memo } from 'react';
import './InscriptionEditor.js';
import type { ElementType } from '@axonivy/inscription-protocol';
import NoEditor from './NoEditor.js';
import { activityEditors } from './activity/all-activity-editors.js';
import { eventEditors } from './event/all-event-editors.js';
import { gatewayEditors } from './gateway/all-gateway-editors.js';
import { IvyIcon, MessageText } from '../widgets/index.js';
import { useDataContext, useEditorContext } from '../../context/index.js';
import type { IvyIcons } from '@axonivy/editor-icons';
import { useGeneralData } from '../parts/name/useGeneralData.js';
import Part from './part/Part.js';
import type { PartProps } from './part/usePart.js';
import { otherEditors } from './other-editors.js';

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
