import { IvyIcons } from '@axonivy/editor-icons';
import { MessageSeverity } from '../props';

const IvyIcon = (props: { icon: IvyIcons | MessageSeverity; rotate?: 45 | 90 | 180 | 270 }) => {
  const rotate = props.rotate ? `ivy-rotate-${props.rotate}` : '';
  return <i className={`ivy ivy-${props.icon} ${rotate}`} />;
};

export default IvyIcon;
