/* eslint-disable react/jsx-key */
import type { ElementType } from '@axonivy/inscription-protocol';
import type { ReactNode } from 'react';
import { memo } from 'react';
import NameEditor from './NameEditor';
import { IvyIcons } from '@axonivy/editor-icons';
import { useGeneralPart } from '../parts';
import { useProcessDataPart } from '../parts/process-data/ProcessDataPart';
import { usePermissionsPart } from '../parts/permissions/PermissionsPart';
import { InscriptionEditor } from '.';
import { useWebServiceProcessPart } from '../parts/web-service-process/WebServiceProcessPart';

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
