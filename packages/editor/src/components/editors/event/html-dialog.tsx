/* eslint-disable react/jsx-key */
import { IvyIcons } from '@axonivy/editor-icons';
import type { ElementType } from '@axonivy/inscription-protocol';
import type { ReactNode } from 'react';
import { memo } from 'react';
import InscriptionEditor from '../InscriptionEditor.js';
import NameEditor from '../NameEditor.js';
import { useGeneralPart, useOutputPart, useResultPart, useStartPart } from '../../../components/parts/index.js';

const HtmlDialogStartEditor = memo(() => {
  const name = useGeneralPart();
  const start = useStartPart({ synchParams: true });
  const result = useResultPart();
  return <InscriptionEditor icon={IvyIcons.InitStart} parts={[name, start, result]} />;
});

const HtmlDialogMethodStartEditor = memo(() => {
  const name = useGeneralPart();
  const start = useStartPart({ hideParamDesc: true, synchParams: true });
  const result = useResultPart({ hideParamDesc: true });
  return <InscriptionEditor icon={IvyIcons.MethodStart} parts={[name, start, result]} />;
});

const HtmlDialogEventStartEditor = memo(() => {
  const name = useGeneralPart();
  const output = useOutputPart();
  return <InscriptionEditor icon={IvyIcons.EventStart} parts={[name, output]} />;
});

export const htmlDialogEventEditors = new Map<ElementType, ReactNode>([
  ['HtmlDialogStart', <HtmlDialogStartEditor />],
  ['HtmlDialogMethodStart', <HtmlDialogMethodStartEditor />],
  ['HtmlDialogEventStart', <HtmlDialogEventStartEditor />],
  ['HtmlDialogExit', <NameEditor icon={IvyIcons.ExitEnd} />],
  ['HtmlDialogEnd', <NameEditor icon={IvyIcons.ProcessEnd} />]
]);
