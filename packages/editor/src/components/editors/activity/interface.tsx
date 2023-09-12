/* eslint-disable react/jsx-key */
import { IvyIcons } from '@axonivy/editor-icons';
import { ElementType } from '@axonivy/inscription-protocol';
import { memo, ReactNode } from 'react';
import InscriptionEditor from '../InscriptionEditor';
import NameEditor from '../NameEditor';
import {
  useMailAttachmentPart,
  useMailHeaderPart,
  useMailMessagePart,
  useNamePart,
  useOutputPart,
  useQueryPart,
  useCachePart
} from '../../../components/parts';

const DatabaseEditor = memo(() => {
  const name = useNamePart();
  const query = useQueryPart();
  const cache = useCachePart();
  const output = useOutputPart();
  return <InscriptionEditor icon={IvyIcons.Database} parts={[name, query, cache, output]} />;
});

const WebServiceEditor = memo(() => {
  const name = useNamePart();
  const cache = useCachePart();
  return <InscriptionEditor icon={IvyIcons.WebService} parts={[name, cache]} />;
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
  ['WebServiceCall', <WebServiceEditor />],
  ['RestClientCall', <NameEditor icon={IvyIcons.RestClient} />],
  ['EMail', <EMailEditor />],
  // ['Rule', <NameEditor title='Rule Activity'/>],
  ['ProgramInterface', <NameEditor icon={IvyIcons.Program} />]
]);
