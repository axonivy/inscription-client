import { IvyIcons } from '@axonivy/editor-icons';
import { ElementType } from '@axonivy/inscription-protocol';
import { memo, ReactNode } from 'react';
import { useNameTab, useOutputTab } from '../../../components/tabs';
import InscriptionEditor from '../InscriptionEditor';
import NameEditor from '../NameEditor';

const HtmlDialogEventStartEditor = memo(() => {
  const nameTab = useNameTab();
  const outputTab = useOutputTab();
  return <InscriptionEditor icon={IvyIcons.EventStart} tabs={[nameTab, outputTab]} />;
});

export const htmlDialogEventEditors = new Map<ElementType, ReactNode>([
  ['HtmlDialogStart', <NameEditor icon={IvyIcons.InitStart} />],
  ['HtmlDialogMethodStart', <NameEditor icon={IvyIcons.MethodStart} />],
  ['HtmlDialogEventStart', <HtmlDialogEventStartEditor />],
  ['HtmlDialogExit', <NameEditor icon={IvyIcons.ExitEnd} />],
  ['HtmlDialogEnd', <NameEditor icon={IvyIcons.End} />]
]);
