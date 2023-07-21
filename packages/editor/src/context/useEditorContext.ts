import { InscriptionContext, InscriptionType } from '@axonivy/inscription-protocol';
import React, { useContext } from 'react';

export type EditorContext = {
  context: InscriptionContext;
  readonly: boolean;
  editorRef: React.MutableRefObject<HTMLElement | null>;
  type: InscriptionType;
};

export const DEFAULT_EDITOR_CONTEXT: EditorContext = {
  context: { app: '', pmv: '', pid: '' },
  readonly: false,
  editorRef: { current: null },
  type: {
    id: 'Script',
    label: 'Unknown Inscription Editor',
    shortLabel: 'Unknown',
    description: 'This is an Inscription Editor for an unknown element type',
    iconId: 'unknown'
  }
};

export const EditorContextInstance = React.createContext<EditorContext>(DEFAULT_EDITOR_CONTEXT);
export const useEditorContext = (): EditorContext => useContext(EditorContextInstance);
export const useReadonly = (): boolean => useContext(EditorContextInstance).readonly;
