import { InscriptionType } from '@axonivy/inscription-core';
import React, { useContext } from 'react';

export interface EditorContext {
  pid: string;
  readonly: boolean;
  type: InscriptionType;
}

export const DEFAULT_INSCRIPTION_TYPE: InscriptionType = {
  id: 'Unknown',
  label: 'Unknown Inscription Editor',
  shortLabel: 'Unknown',
  description: 'This is an Inscription Editor for an unknown element type',
  iconId: 'unknown'
};

export const EditorContextInstance = React.createContext<EditorContext>({ pid: '', readonly: false, type: DEFAULT_INSCRIPTION_TYPE });
export const useEditorContext = (): EditorContext => useContext(EditorContextInstance);
export const useReadonly = (): boolean => useContext(EditorContextInstance).readonly;
