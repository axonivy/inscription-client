import { IvyIcons } from '@axonivy/editor-icons';
import { ActivityEditorType } from '@axonivy/inscription-core';
import { memo } from 'react';
import { TabState } from '../../../components/props';
import { useNameTab } from '../../../components/tabs';
import InscriptionEditor from '../InscriptionEditor';
import NameEditor from '../NameEditor';

const EMailEditor = memo(() => {
  const nameTab = useNameTab();
  const headerTab = { name: 'Header', content: <div>Header</div>, state: TabState.EMPTY };
  const contentTab = { name: 'Content', content: <div>Content</div>, state: TabState.EMPTY };
  const attachmentTab = { name: 'Attachments', content: <div>Attachments</div>, state: TabState.EMPTY };
  return <InscriptionEditor title='E-Mail Activity' icon={IvyIcons.EMail} tabs={[nameTab, headerTab, contentTab, attachmentTab]} />;
});

export const interfaceActivityEditors = new Map<ActivityEditorType.Interface, JSX.Element>([
  ['Database', <NameEditor title='Datebase Activity' icon={IvyIcons.Database} />],
  ['WebServiceCall', <NameEditor title='Web Service Call Activity' icon={IvyIcons.WebService} />],
  ['RestClientCall', <NameEditor title='Rest Service Call Activity' icon={IvyIcons.RestClient} />],
  ['EMail', <EMailEditor />],
  // ['Rule', <NameEditor title='Rule Activity'/>],
  ['ProgramInterface', <NameEditor title='Program Interface Activity' icon={IvyIcons.Program} />]
]);
