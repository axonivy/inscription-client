/* eslint-disable react/jsx-key */
import { IvyIcons } from '@axonivy/editor-icons';
import type { ReactNode} from 'react';
import { memo } from 'react';
import NameEditor from '../NameEditor.js';
import type { ElementType } from '@axonivy/inscription-protocol';
import { useGeneralPart, useResultPart, useStartPart } from '../../../components/parts/index.js';
import InscriptionEditor from '../InscriptionEditor.js';

const CallSubStartEditor = memo(() => {
  const name = useGeneralPart();
  const start = useStartPart({ synchParams: true });
  const result = useResultPart();
  return <InscriptionEditor icon={IvyIcons.SubStart} parts={[name, start, result]} />;
});

export const callSubEventEditors = new Map<ElementType, ReactNode>([
  ['CallSubStart', <CallSubStartEditor />],
  ['CallSubEnd', <NameEditor icon={IvyIcons.SubEnd} />]
]);
