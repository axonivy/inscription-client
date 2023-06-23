import { IvyIcons } from '@axonivy/editor-icons';
import { Severity } from '@axonivy/inscription-protocol';

export type IvyIconProps = {
  icon: IvyIcons | Severity;
  rotate?: 45 | 90 | 180 | 270;
};

const IvyIcon = ({ icon, rotate }: IvyIconProps) => {
  return <i className={`ivy ivy-${icon.toString().toLowerCase()} ${rotate ? `ivy-rotate-${rotate}` : ''}`} />;
};

export default IvyIcon;
