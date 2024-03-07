/* eslint-disable react/jsx-key */
import type { ElementType } from '@axonivy/inscription-protocol';
import type { ReactNode } from 'react';
import { memo } from 'react';
import InscriptionEditor from '../InscriptionEditor';
import { useConfigurationPart, useEventPart, useGeneralPart, useOutputPart, useTaskPart } from '../../../components/parts';

const ThirdPartyWaitEventEditor = memo(() => {
  const name = useGeneralPart();
  const event = useEventPart({ thirdParty: true });
  const configuration = useConfigurationPart();
  const task = useTaskPart({ type: 'wait' });
  const output = useOutputPart();
  return <InscriptionEditor parts={[name, event, configuration, task, output]} />;
});

export const thirdPartyIntermediateEventEditors = new Map<ElementType, ReactNode>([['ThirdPartyWaitEvent', <ThirdPartyWaitEventEditor />]]);
