/* eslint-disable react/jsx-key */
import { IvyIcons } from '@axonivy/ui-icons';
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
  useWsErrorPart,
  useRestOutputPart,
  useRestRequestPart,
  useProgramInterfaceStartPart,
  useConfigurationPart,
  useRestErrorPart,
  useDbErrorPart,
  useMailErrorPart
} from '../../../components/parts';
import { OpenApiContextProvider } from '../../../context/useOpenApi';

const DatabaseEditor = memo(() => {
  const name = useGeneralPart();
  const query = useQueryPart();
  const cache = useCachePart();
  const error = useDbErrorPart();
  const output = useOutputPart({ additionalBrowsers: ['tablecol'] });
  return <InscriptionEditor icon={IvyIcons.Database} parts={[name, query, cache, error, output]} />;
});

const WebServiceEditor = memo(() => {
  const name = useGeneralPart();
  const request = useWsRequestPart();
  const cache = useCachePart();
  const error = useWsErrorPart();
  const output = useOutputPart();
  return <InscriptionEditor icon={IvyIcons.WebService} parts={[name, request, cache, error, output]} />;
});

const RestEditor = memo(() => {
  const name = useGeneralPart();
  const request = useRestRequestPart();
  const error = useRestErrorPart();
  const output = useRestOutputPart();
  return (
    <OpenApiContextProvider>
      <InscriptionEditor icon={IvyIcons.RestClient} parts={[name, request, error, output]} />
    </OpenApiContextProvider>
  );
});

const EMailEditor = memo(() => {
  const name = useGeneralPart();
  const header = useMailHeaderPart();
  const error = useMailErrorPart();
  const content = useMailMessagePart();
  const attachment = useMailAttachmentPart();
  return <InscriptionEditor icon={IvyIcons.EMail} parts={[name, header, error, content, attachment]} />;
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
