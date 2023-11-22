/* eslint-disable react/jsx-key */
import { IvyIcons } from '@axonivy/editor-icons';
import type { ElementType } from '@axonivy/inscription-protocol';
import type { ReactNode } from 'react';
import { memo } from 'react';
import InscriptionEditor from '../InscriptionEditor';
import {
  useMailAttachmentPart,
  useMailHeaderPart,
  useMailMessagePart,
  useGeneralPart,
  useOutputPart,
  useQueryPart,
  useCachePart,
  useWsRequestPart,
  useWsResponsePart,
  useRestResponsePart,
  useRestRequestPart,
  useProgramInterfaceStartPart,
  useConfigurationPart
} from '../../../components/parts';
import { OpenApiContextProvider } from '../../../context/useOpenApi';

const DatabaseEditor = memo(() => {
  const name = useGeneralPart();
  const query = useQueryPart();
  const cache = useCachePart();
  const output = useOutputPart({ additionalBrowsers: ['tablecol'] });
  return <InscriptionEditor icon={IvyIcons.Database} parts={[name, query, cache, output]} />;
});

const WebServiceEditor = memo(() => {
  const name = useGeneralPart();
  const request = useWsRequestPart();
  const response = useWsResponsePart();
  const cache = useCachePart();
  return <InscriptionEditor icon={IvyIcons.WebService} parts={[name, request, response, cache]} />;
});

const RestEditor = memo(() => {
  const name = useGeneralPart();
  const request = useRestRequestPart();
  const response = useRestResponsePart();
  return (
    <OpenApiContextProvider>
      <InscriptionEditor icon={IvyIcons.RestClient} parts={[name, request, response]} />
    </OpenApiContextProvider>
  );
});

const EMailEditor = memo(() => {
  const name = useGeneralPart();
  const header = useMailHeaderPart();
  const content = useMailMessagePart();
  const attachment = useMailAttachmentPart();
  return <InscriptionEditor icon={IvyIcons.EMail} parts={[name, header, content, attachment]} />;
});

const ProgramInterfaceEditor = memo(() => {
  const name = useGeneralPart();
  const start = useProgramInterfaceStartPart();
  const configuration = useConfigurationPart();
  return <InscriptionEditor icon={IvyIcons.ProgramOutline} parts={[name, start, configuration]} />;
});

export const interfaceActivityEditors = new Map<ElementType, ReactNode>([
  ['Database', <DatabaseEditor />],
  ['WebServiceCall', <WebServiceEditor />],
  ['RestClientCall', <RestEditor />],
  ['EMail', <EMailEditor />],
  // ['Rule', <NameEditor title='Rule Activity'/>],
  ['ProgramInterface', <ProgramInterfaceEditor />]
]);
