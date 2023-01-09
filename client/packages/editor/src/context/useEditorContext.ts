import { InscriptionEditorType } from '@axonivy/inscription-core';
import React, { useContext } from 'react';

export interface EditorContext {
  pid: string;
  readonly: boolean;
  type?: InscriptionEditorType;
}

export const EditorContextInstance = React.createContext<EditorContext>({ pid: '', readonly: false });
export const useEditorContext = (): EditorContext => useContext(EditorContextInstance);
export const useReadonly = (): boolean => useContext(EditorContextInstance).readonly;
