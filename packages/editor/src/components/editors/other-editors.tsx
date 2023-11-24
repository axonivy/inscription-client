/* eslint-disable react/jsx-key */
import type { ElementType } from '@axonivy/inscription-protocol';
import type { ReactNode } from 'react';
import { memo } from 'react';
import NameEditor from './NameEditor.js';
import { IvyIcons } from '@axonivy/editor-icons';
import { useGeneralPart } from '../parts/index.js';
import { useProcessDataPart } from '../parts/process-data/ProcessDataPart.js';
import { usePermissionsPart } from '../parts/permissions/PermissionsPart.js';
import { InscriptionEditor } from './index.js';
import { useWebServiceProcessPart } from '../parts/web-service-process/WebServiceProcessPart.js';

const BusinessProcessEditor = memo(() => {
  const name = useGeneralPart({ disableName: true, hideTags: true });
  const processData = useProcessDataPart();
  const permissions = usePermissionsPart();
  return <InscriptionEditor icon={IvyIcons.Process} parts={[name, processData, permissions]} />;
});

const WebserviceProcessEditor = memo(() => {
  const name = useGeneralPart({ disableName: true, hideTags: true });
  const webServiceProcess = useWebServiceProcessPart();
  const processData = useProcessDataPart();
  const permissions = usePermissionsPart();
  return <InscriptionEditor icon={IvyIcons.Process} parts={[name, webServiceProcess, processData, permissions]} />;
});

const CallableSubProcessEditor = memo(() => {
  const name = useGeneralPart({ disableName: true, hideTags: true });
  const processData = useProcessDataPart();
  const permissions = usePermissionsPart();
  return <InscriptionEditor icon={IvyIcons.Process} parts={[name, processData, permissions]} />;
});

const HTMLDialogLogicEditor = memo(() => {
  const name = useGeneralPart({ disableName: true, hideTags: true });
  const permissions = usePermissionsPart();
  return <InscriptionEditor icon={IvyIcons.Process} parts={[name, permissions]} />;
});

export const otherEditors = new Map<ElementType, ReactNode>([
  ['ProcessAnnotation', <NameEditor icon={IvyIcons.Note} hideTags={true} />],
  ['Process', <BusinessProcessEditor />],
  ['WebserviceProcess', <WebserviceProcessEditor />],
  ['CallableSubProcess', <CallableSubProcessEditor />],
  ['HtmlDialogProcess', <HTMLDialogLogicEditor />]
]);
