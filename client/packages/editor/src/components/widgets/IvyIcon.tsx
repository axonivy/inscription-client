import { IvyIcons } from '@axonivy/editor-icons';
import { MessageSeverity } from '../props';

const IvyIcon = (props: { icon: IvyIcons | MessageSeverity; rotate?: 45 | 90 | 180 | 270 }) => (
  <i className={`ivy ivy-${props.icon} ivy-rotate-${props.rotate}`} />
);

export default IvyIcon;
