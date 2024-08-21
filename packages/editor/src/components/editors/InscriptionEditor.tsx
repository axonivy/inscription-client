import type { ComponentProps, ReactNode } from 'react';
import { useState } from 'react';
import './InscriptionEditor.css';
import type { ElementType, Severity } from '@axonivy/inscription-protocol';
import NoEditor from './NoEditor';
import { activityEditors } from './activity/all-activity-editors';
import { eventEditors } from './event/all-event-editors';
import { gatewayEditors } from './gateway/all-gateway-editors';
import { useAction, useDataContext, useEditorContext } from '../../context';
import { IvyIcons } from '@axonivy/ui-icons';
import { useGeneralData } from '../parts/name/useGeneralData';
import { otherEditors } from './other-editors';
import { thirdPartyEditors } from './third-party/all-third-party-editors';
import { Button, Flex, Message, Outline, SidebarHeader, SidebarMessages, Switch } from '@axonivy/ui-components';

export type KnownEditor = { editor: ReactNode; icon?: IvyIcons };

const editors = new Map<ElementType, KnownEditor>([
  ...eventEditors,
  ...gatewayEditors,
  ...activityEditors,
  ...thirdPartyEditors,
  ...otherEditors
]);

const inscriptionEditor = (type?: ElementType): ReactNode => {
  if (type) {
    return editors.get(type)?.editor ?? <NoEditor type={type} />;
  }
  return <NoEditor />;
};

const Header = ({ children }: { children?: ReactNode }) => {
  const { data } = useGeneralData();
  const validations = useDataContext().validations.filter(val => val.path.length === 0);
  const { type } = useEditorContext();
  const helpUrl = type.helpUrl;
  const action = useAction('openPage');
  const title = type.id?.length === 0 ? 'Inscription' : `${type.shortLabel}${data.name?.length > 0 ? ` - ${data.name}` : ''}`;
  const icon = editors.get(type.id)?.icon;
  return (
    <>
      <SidebarHeader title={title} icon={icon} className='header'>
        {children}
        {helpUrl !== undefined && helpUrl !== '' && (
          <Button icon={IvyIcons.Help} onClick={() => action(helpUrl)} aria-label={`Open Help for ${type.shortLabel}`} />
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

export type InscriptionEditorProps = Omit<ComponentProps<typeof Outline>, 'onDoubleClick'>;

export const InscriptionEditor = ({ outline }: { outline?: Omit<ComponentProps<typeof Outline>, 'onDoubleClick'> }) => {
  const { type } = useEditorContext();
  const [showOutline, setShowOutline] = useState(false);
  return (
    <Flex direction='column' className='editor' style={{ height: '100%' }}>
      <Header>
        {outline && <Switch size='large' icon={{ icon: IvyIcons.List }} checked={showOutline} onCheckedChange={setShowOutline} />}
      </Header>
      {outline && showOutline ? <Outline {...outline} onDoubleClick={() => setShowOutline(false)} /> : inscriptionEditor(type.id)}
    </Flex>
  );
};
