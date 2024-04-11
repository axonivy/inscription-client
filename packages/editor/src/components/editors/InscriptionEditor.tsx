import type { ReactNode } from 'react';
import { memo } from 'react';
import './InscriptionEditor.css';
import type { ElementType, Severity } from '@axonivy/inscription-protocol';
import NoEditor from './NoEditor';
import { activityEditors } from './activity/all-activity-editors';
import { eventEditors } from './event/all-event-editors';
import { gatewayEditors } from './gateway/all-gateway-editors';
import { useAction, useDataContext, useEditorContext } from '../../context';
import { IvyIcons } from '@axonivy/ui-icons';
import { useGeneralData } from '../parts/name/useGeneralData';
import Part from './part/Part';
import type { PartProps } from './part/usePart';
import { otherEditors } from './other-editors';
import { thirdPartyEditors } from './third-party/all-third-party-editors';
import { Button, Flex, Message, SidebarHeader, SidebarMessages } from '@axonivy/ui-components';

const editors = new Map<ElementType, ReactNode>([
  ...eventEditors,
  ...gatewayEditors,
  ...activityEditors,
  ...thirdPartyEditors,
  ...otherEditors
]);

export const inscriptionEditor = (type?: ElementType): ReactNode => {
  if (type) {
    return editors.get(type) ?? <NoEditor type={type} />;
  }
  return <NoEditor />;
};

export interface EditorProps {
  icon?: IvyIcons;
  parts: PartProps[];
}

const Header = ({ icon }: Pick<EditorProps, 'icon'>) => {
  const { data } = useGeneralData();
  const validations = useDataContext().validations.filter(val => val.path.length === 0);
  const editorContext = useEditorContext();
  const helpUrl = editorContext.type.helpUrl;
  const action = useAction('openPage');
  const title = `${editorContext.type.shortLabel}${data.name.length > 0 ? ` - ${data.name}` : ''}`;
  return (
    <>
      <SidebarHeader title={title} icon={icon} className='header'>
        {helpUrl !== undefined && helpUrl !== '' && (
          <Button icon={IvyIcons.Help} onClick={() => action(helpUrl)} aria-label={`Open Help for ${editorContext.type.shortLabel}`} />
        )}
      </SidebarHeader>
      {validations.length > 0 && (
        <SidebarMessages className='header-messages'>
          {validations.map((validaiton, index) => (
            <Message key={index} message={validaiton.message} variant={validaiton.severity.toLocaleLowerCase() as Lowercase<Severity>} />
          ))}
        </SidebarMessages>
      )}
    </>
  );
};

const InscriptionEditor = ({ icon, parts }: EditorProps) => (
  <Flex direction='column' className='editor'>
    <Header icon={icon} />
    <Flex direction='column' className='content'>
      <Part parts={parts} />
    </Flex>
  </Flex>
);

export default memo(InscriptionEditor);
