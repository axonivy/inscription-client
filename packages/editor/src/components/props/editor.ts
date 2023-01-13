import { IvyIcons } from '@axonivy/editor-icons';
import { useMemo } from 'react';
import { useData, useDataContext } from '../../context';
import { Message } from './message';
import { TabProps } from './tab';

export interface EditorProps {
  icon: IvyIcons;
  tabs: TabProps[];
}

export const useEditorState = () => {
  const [, name] = useData('name');
  const { validation } = useDataContext();
  const headerState = useMemo<Message[]>(() => {
    if (validation.length > 0) {
      return validation;
    }
    return [{ severity: 'info', message: name }];
  }, [name, validation]);
  return headerState;
};
