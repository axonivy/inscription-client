import { IvyIcons } from '@axonivy/editor-icons';

const IvyIcon = (props: { icon: IvyIcons; rotate?: 45 | 90 | 180 | 270 }) => (
  <i className={`ivy ivy-${props.icon} ivy-rotate-${props.rotate}`} />
);

export default IvyIcon;
