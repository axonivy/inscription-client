import type { IvyIcons } from '@axonivy/editor-icons';

export interface FieldsetControl {
  label: string;
  icon: IvyIcons;
  active?: boolean;
  withSeperator?: boolean;
  action: () => void;
}
