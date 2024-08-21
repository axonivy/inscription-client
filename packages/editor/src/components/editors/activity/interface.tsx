/* eslint-disable react/jsx-key */
import { IvyIcons } from '@axonivy/ui-icons';
import type { ElementType } from '@axonivy/inscription-protocol';
import { memo } from 'react';
import { type KnownEditor } from '../InscriptionEditor';
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
  useMailErrorPart,
  useProgramInterfaceErrorPart
} from '../../../components/parts';
import { OpenApiContextProvider } from '../../../context/useOpenApi';
import Part from '../part/Part';

const DatabaseEditor = memo(() => {
  const name = useGeneralPart();
  const query = useQueryPart();
  const cache = useCachePart();
  const error = useDbErrorPart();
  const output = useOutputPart({ additionalBrowsers: ['tablecol'] });
  return <Part parts={[name, query, cache, error, output]} />;
});

const WebServiceEditor = memo(() => {
  const name = useGeneralPart();
  const request = useWsRequestPart();
  const cache = useCachePart();
  const error = useWsErrorPart();
  const output = useOutputPart();
  return <Part parts={[name, request, cache, error, output]} />;
});

const RestEditor = memo(() => {
  const name = useGeneralPart();
  const request = useRestRequestPart();
  const error = useRestErrorPart();
  const output = useRestOutputPart();
  return (
    <OpenApiContextProvider>
      <Part parts={[name, request, error, output]} />
    </OpenApiContextProvider>
  );
});

const EMailEditor = memo(() => {
  const name = useGeneralPart();
  const header = useMailHeaderPart();
  const error = useMailErrorPart();
  const content = useMailMessagePart();
  const attachment = useMailAttachmentPart();
  return <Part parts={[name, header, error, content, attachment]} />;
});

const ProgramInterfaceEditor = memo(() => {
  const name = useGeneralPart();
  const start = useProgramInterfaceStartPart();
  const error = useProgramInterfaceErrorPart();
  const configuration = useConfigurationPart();
  return <Part parts={[name, start, error, configuration]} />;
});

export const interfaceActivityEditors = new Map<ElementType, KnownEditor>([
  ['Database', { editor: <DatabaseEditor />, icon: IvyIcons.Database }],
  ['WebServiceCall', { editor: <WebServiceEditor />, icon: IvyIcons.WebService }],
  ['RestClientCall', { editor: <RestEditor />, icon: IvyIcons.RestClient }],
  ['EMail', { editor: <EMailEditor />, icon: IvyIcons.EMail }],
  ['ProgramInterface', { editor: <ProgramInterfaceEditor />, icon: IvyIcons.ProgramOutline }]
]);
