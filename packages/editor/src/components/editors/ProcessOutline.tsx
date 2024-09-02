import { Outline, type OutlineNode, type OutlineProps } from '@axonivy/ui-components';
import type { OutlineNode as ProcessOutlineNode } from '@axonivy/inscription-protocol';
import { useEditorContext, useMeta } from '../../context';
import { PID } from '../../utils/pid';
import { IvyIcons } from '@axonivy/ui-icons';
import { useMemo } from 'react';

export type ProcessOutlineProps = Omit<OutlineProps, 'outline'>;

export const ProcessOutline = (props: ProcessOutlineProps) => {
  const { context, elementContext } = useEditorContext();
  const processId = PID.processId(elementContext.pid);
  const outlineData = useMeta(
    'meta/process/outline',
    { context, processId },
    { id: processId, title: 'Process', type: 'PROCESS', info: processId, children: [] }
  ).data;
  const outline = useMemo(() => outlineNodes(outlineData), [outlineData]);
  return <Outline outline={outline} {...props} />;
};

const iconForElement = (node: ProcessOutlineNode) => {
  switch (node.type) {
    case 'EVENT_BOUNDARY':
    case 'EVENT_START':
    case 'EVENT_END':
    case 'EVENT_INTERMEDIATE':
      return IvyIcons.Start;
    case 'GATEWAY':
      return IvyIcons.GatewaysGroup;
    case 'ACTIVITY':
      return IvyIcons.ActivitiesGroup;
    default:
      return undefined;
  }
};

const infoForElement = (node: ProcessOutlineNode) => (node.info && node.info.length > 0 ? node.info : node.id);
const toOutlineNodes = (nodes: Array<ProcessOutlineNode>): Array<OutlineNode> =>
  nodes
    .sort((a, b) => a.type.localeCompare(b.type))
    .map<OutlineNode>(node => {
      const children = toOutlineNodes(node.children);
      return { ...node, info: infoForElement(node), icon: iconForElement(node), children };
    });

const outlineNodes = (root: ProcessOutlineNode): Array<OutlineNode> => {
  const children = toOutlineNodes(root.children);
  return [{ ...root, info: infoForElement(root), icon: IvyIcons.Process, children }];
};
