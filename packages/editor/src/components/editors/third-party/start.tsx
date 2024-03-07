/* eslint-disable react/jsx-key */
import type { ElementType } from '@axonivy/inscription-protocol';
import type { ReactNode } from 'react';
import { memo } from 'react';
import InscriptionEditor from '../InscriptionEditor';

import { useGeneralPart, useProgramStartPart, useConfigurationPart } from '../../../components/parts';

const ThirdPartyProgramStartEditor = memo(() => {
  const name = useGeneralPart();
  const start = useProgramStartPart({ thirdParty: true });
  const configuration = useConfigurationPart();
  return <InscriptionEditor parts={[name, start, configuration]} />;
});

export const thirdPartyStartEventEditors = new Map<ElementType, ReactNode>([['ThirdPartyProgramStart', <ThirdPartyProgramStartEditor />]]);
