/* eslint-disable react/jsx-key */
import { IvyIcons } from '@axonivy/ui-icons';
import type { ReactNode } from 'react';
import { memo } from 'react';
import NameEditor from '../NameEditor';
import type { ElementType } from '@axonivy/inscription-protocol';
import { useGeneralPart, useResultPart, useStartPart } from '../../../components/parts';
import InscriptionEditor from '../InscriptionEditor';

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
