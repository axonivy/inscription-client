/* eslint-disable react/jsx-key */
import type { ElementType } from '@axonivy/inscription-protocol';
import type { ReactNode } from 'react';
import { memo } from 'react';
import InscriptionEditor from '../InscriptionEditor';
import { useGeneralPart, useProgramInterfaceErrorPart, useConfigurationPart } from '../../../components/parts';

const ThirdPartyProgramInterfaceEditor = memo(() => {
  const name = useGeneralPart();
  const error = useProgramInterfaceErrorPart();
  const configuration = useConfigurationPart();
  return <InscriptionEditor parts={[name, error, configuration]} />;
});

export const thirdPartyInterfaceActivityEditors = new Map<ElementType, ReactNode>([
  ['ThirdPartyProgramInterface', <ThirdPartyProgramInterfaceEditor />]
]);
