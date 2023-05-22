import { IvyIcons } from '@axonivy/editor-icons';
import { Severity } from '@axonivy/inscription-protocol';

const IvyIcon = (props: { icon: IvyIcons | Severity; rotate?: 45 | 90 | 180 | 270 }) => {
  const rotate = props.rotate ? `ivy-rotate-${props.rotate}` : '';
  return <i className={`ivy ivy-${props.icon.toString().toLowerCase()} ${rotate}`} />;
};

export default IvyIcon;
