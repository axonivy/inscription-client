/* eslint-disable react/jsx-key */
import { IvyIcons } from '@axonivy/ui-icons';
import type { ElementType } from '@axonivy/inscription-protocol';
import type { ReactNode } from 'react';
import { memo } from 'react';
import InscriptionEditor from '../InscriptionEditor';
import { useGeneralPart, useProgramInterfaceStartPart, useConfigurationPart } from '../../../components/parts';

const ThirdPartyProgramInterfaceEditor = memo(() => {
  const name = useGeneralPart();
  const start = useProgramInterfaceStartPart({ thirdParty: true });
  const configuration = useConfigurationPart();
  return <InscriptionEditor icon={IvyIcons.Extension} parts={[name, start, configuration]} />;
});

export const thirdPartyInterfaceActivityEditors = new Map<ElementType, ReactNode>([
  ['ThirdPartyProgramInterface', <ThirdPartyProgramInterfaceEditor />]
]);
