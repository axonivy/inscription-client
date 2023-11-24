/* eslint-disable react/jsx-key */
import { IvyIcons } from '@axonivy/editor-icons';
import type { ElementType } from '@axonivy/inscription-protocol';
import type { ReactNode } from 'react';
import { memo } from 'react';
import InscriptionEditor from '../InscriptionEditor.js';
import NameEditor from '../NameEditor.js';
import { useCasePart, useGeneralPart, useResultPart, useStartPart, useTaskPart, useWebServicePart } from '../../../components/parts/index.js';

const WebserviceStartEditor = memo(() => {
  const name = useGeneralPart();
  const start = useStartPart({ synchParams: true });
  const result = useResultPart();
  const webService = useWebServicePart();
  const task = useTaskPart({ type: 'ws' });
  const casePart = useCasePart();
  return <InscriptionEditor icon={IvyIcons.WebService} parts={[name, start, result, webService, task, casePart]} />;
});

export const webServiceEventEditors = new Map<ElementType, ReactNode>([
  ['WebserviceStart', <WebserviceStartEditor />],
  ['WebserviceEnd', <NameEditor icon={IvyIcons.WebService} />]
]);
