import { IvyIcons } from '@axonivy/editor-icons';
import { ElementType } from '@axonivy/inscription-protocol';
import { memo, ReactNode } from 'react';
import { useNameTab, useOutputTab } from '../../../components/tabs';
import InscriptionEditor from '../InscriptionEditor';
import NameEditor from '../NameEditor';

const DatabaseEditor = memo(() => {
  const nameTab = useNameTab();
  const outputTab = useOutputTab();
  return <InscriptionEditor icon={IvyIcons.Database} tabs={[nameTab, outputTab]} />;
});

const EMailEditor = memo(() => {
  const nameTab = useNameTab();
  const headerTab = { name: 'Header', content: <div>Header</div> };
  const contentTab = { name: 'Content', content: <div>Content</div> };
  const attachmentTab = { name: 'Attachments', content: <div>Attachments</div> };
  return <InscriptionEditor icon={IvyIcons.EMail} tabs={[nameTab, headerTab, contentTab, attachmentTab]} />;
});

export const interfaceActivityEditors = new Map<ElementType, ReactNode>([
  ['Database', <DatabaseEditor />],
  ['WebServiceCall', <NameEditor icon={IvyIcons.WebService} />],
  ['RestClientCall', <NameEditor icon={IvyIcons.RestClient} />],
  ['EMail', <EMailEditor />],
  // ['Rule', <NameEditor title='Rule Activity'/>],
  ['ProgramInterface', <NameEditor icon={IvyIcons.Program} />]
]);
