import { IvyIcons } from '@axonivy/editor-icons';
import { ElementType } from '@axonivy/inscription-protocol';
import { memo, ReactNode } from 'react';
import InscriptionEditor from '../InscriptionEditor';
import NameEditor from '../NameEditor';
import { useMailAttachmentPart, useMailHeaderPart, useMailMessagePart, useNamePart, useOutputPart } from '../../../components/parts';

const DatabaseEditor = memo(() => {
  const name = useNamePart();
  const output = useOutputPart();
  return <InscriptionEditor icon={IvyIcons.Database} parts={[name, output]} />;
});

const EMailEditor = memo(() => {
  const name = useNamePart();
  const header = useMailHeaderPart();
  const content = useMailMessagePart();
  const attachment = useMailAttachmentPart();
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
