import { IvyIcons } from '@axonivy/editor-icons';
import { ElementType } from '@axonivy/inscription-protocol';
import { memo, ReactNode } from 'react';
import InscriptionEditor from '../InscriptionEditor';
import NameEditor from '../NameEditor';
import { useNamePart, useOutputPart } from '../../../components/parts';

const HtmlDialogEventStartEditor = memo(() => {
  const name = useNamePart();
  const output = useOutputPart();
  return <InscriptionEditor icon={IvyIcons.EventStart} parts={[name, output]} />;
});

export const htmlDialogEventEditors = new Map<ElementType, ReactNode>([
  ['HtmlDialogStart', <NameEditor icon={IvyIcons.InitStart} />],
  ['HtmlDialogMethodStart', <NameEditor icon={IvyIcons.MethodStart} />],
  ['HtmlDialogEventStart', <HtmlDialogEventStartEditor />],
  ['HtmlDialogExit', <NameEditor icon={IvyIcons.ExitEnd} />],
  ['HtmlDialogEnd', <NameEditor icon={IvyIcons.End} />]
]);
