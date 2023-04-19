import { IvyIcons } from '@axonivy/editor-icons';
import { ElementType } from '@axonivy/inscription-protocol';
import { memo, ReactNode } from 'react';
import { useEndPageTab, useNameTab } from '../../../components/tabs';
import InscriptionEditor from '../InscriptionEditor';
import NameEditor from '../NameEditor';

const TaskEndPageEditor = memo(() => {
  const nameTab = useNameTab();
  const endPageTab = useEndPageTab();
  return <InscriptionEditor icon={IvyIcons.EndPage} tabs={[nameTab, endPageTab]} />;
});

export const endEventEditors = new Map<ElementType, ReactNode>([
  ['TaskEnd', <NameEditor icon={IvyIcons.End} />],
  ['TaskEndPage', <TaskEndPageEditor />],
  ['ErrorEnd', <NameEditor icon={IvyIcons.ErrorEvent} />]
]);
