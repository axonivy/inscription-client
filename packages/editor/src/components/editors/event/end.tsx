import { IvyIcons } from '@axonivy/editor-icons';
import { ElementType } from '@axonivy/inscription-protocol';
import { memo, ReactNode } from 'react';
import InscriptionEditor from '../InscriptionEditor';
import NameEditor from '../NameEditor';
import { useEndPagePart, useNamePart } from '../../../components/parts';

const TaskEndPageEditor = memo(() => {
  const name = useNamePart();
  const endPage = useEndPagePart();
  return <InscriptionEditor icon={IvyIcons.EndPage} parts={[name, endPage]} />;
});

export const endEventEditors = new Map<ElementType, ReactNode>([
  ['TaskEnd', <NameEditor icon={IvyIcons.End} />],
  ['TaskEndPage', <TaskEndPageEditor />],
  ['ErrorEnd', <NameEditor icon={IvyIcons.ErrorEvent} />]
]);
