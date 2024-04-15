/* eslint-disable react/jsx-key */
import { IvyIcons } from '@axonivy/ui-icons';
import type { ElementType } from '@axonivy/inscription-protocol';
import type { ReactNode } from 'react';
import { memo } from 'react';
import InscriptionEditor from '../InscriptionEditor';
import NameEditor from '../NameEditor';
import { useEndPagePart, useGeneralPart, useErrorThrowPart } from '../../../components/parts';

const TaskEndPageEditor = memo(() => {
  const name = useGeneralPart();
  const endPage = useEndPagePart();
  return <InscriptionEditor icon={IvyIcons.EndPage} parts={[name, endPage]} />;
});

const ErrorEndEditor = memo(() => {
  const name = useGeneralPart();
  const error = useErrorThrowPart();
  return <InscriptionEditor icon={IvyIcons.ErrorEnd} parts={[name, error]} />;
});

export const endEventEditors = new Map<ElementType, ReactNode>([
  ['TaskEnd', <NameEditor icon={IvyIcons.ProcessEnd} />],
  ['TaskEndPage', <TaskEndPageEditor />],
  ['ErrorEnd', <ErrorEndEditor />]
]);
