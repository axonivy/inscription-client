/* eslint-disable react/jsx-key */
import { IvyIcons } from '@axonivy/editor-icons';
import { ElementType } from '@axonivy/inscription-protocol';
import { memo, ReactNode } from 'react';
import InscriptionEditor from '../InscriptionEditor';
import {
  useMailAttachmentPart,
  useMailHeaderPart,
  useMailMessagePart,
  useNamePart,
  useOutputPart,
  useQueryPart,
  useCachePart,
  useWsRequestPart,
  useWsResponsePart,
  useRestResponsePart,
  useRestRequestPart,
  useProgramInterfaceStartPart
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
  const request = useWsRequestPart();
  const response = useWsResponsePart();
  const cache = useCachePart();
  return <InscriptionEditor icon={IvyIcons.WebService} parts={[name, request, response, cache]} />;
});

const RestEditor = memo(() => {
  const name = useNamePart();
  const request = useRestRequestPart();
  const response = useRestResponsePart();
  return <InscriptionEditor icon={IvyIcons.RestClient} parts={[name, request, response]} />;
});

const EMailEditor = memo(() => {
  const name = useNamePart();
  const header = useMailHeaderPart();
  const content = useMailMessagePart();
  const attachment = useMailAttachmentPart();
  return <InscriptionEditor icon={IvyIcons.EMail} parts={[name, header, content, attachment]} />;
});

const ProgramInterfaceEditor = memo(() => {
  const name = useNamePart();
  const start = useProgramInterfaceStartPart();
  return <InscriptionEditor icon={IvyIcons.Program} parts={[name, start]} />;
});

export const interfaceActivityEditors = new Map<ElementType, ReactNode>([
  ['Database', <DatabaseEditor />],
  ['WebServiceCall', <WebServiceEditor />],
  ['RestClientCall', <RestEditor />],
  ['EMail', <EMailEditor />],
  // ['Rule', <NameEditor title='Rule Activity'/>],
  ['ProgramInterface', <ProgramInterfaceEditor />]
]);
