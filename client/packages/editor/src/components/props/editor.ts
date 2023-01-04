import { useMemo } from 'react';
import { useDataContext } from '../../context';
import { Message } from './message';
import { TabProps } from './tab';

export interface EditorProps {
  title: string;
  icon: string;
  editorState: Message[];
  tabs: TabProps[];
}

export const useEditorState = (emptyMessage: string) => {
  const { validation } = useDataContext();
  const headerState = useMemo<Message[]>(() => {
    if (validation.length > 0) {
      return validation;
    }
    return [{ severity: 'info', message: emptyMessage }];
  }, [emptyMessage, validation]);
  return headerState;
};
