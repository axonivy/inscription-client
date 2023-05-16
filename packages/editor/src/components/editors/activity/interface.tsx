import { IvyIcons } from '@axonivy/editor-icons';
import { ElementType } from '@axonivy/inscription-protocol';
import { memo, ReactNode } from 'react';
import InscriptionEditor from '../InscriptionEditor';
import NameEditor from '../NameEditor';
import { useNamePart, useOutputPart } from '../../../components/parts';

const DatabaseEditor = memo(() => {
  const name = useNamePart();
  const output = useOutputPart();
  return <InscriptionEditor icon={IvyIcons.Database} parts={[name, output]} />;
});

const EMailEditor = memo(() => {
  const name = useNamePart();
  const header = { name: 'Header', content: <div>Header</div> };
  const content = { name: 'Content', content: <div>Content</div> };
  const attachment = { name: 'Attachments', content: <div>Attachments</div> };
  return <InscriptionEditor icon={IvyIcons.EMail} parts={[name, header, content, attachment]} />;
});

export const interfaceActivityEditors = new Map<ElementType, ReactNode>([
  ['Database', <DatabaseEditor />],
  ['WebServiceCall', <NameEditor icon={IvyIcons.WebService} />],
  ['RestClientCall', <NameEditor icon={IvyIcons.RestClient} />],
  ['EMail', <EMailEditor />],
  // ['Rule', <NameEditor title='Rule Activity'/>],
  ['ProgramInterface', <NameEditor icon={IvyIcons.Program} />]
]);
