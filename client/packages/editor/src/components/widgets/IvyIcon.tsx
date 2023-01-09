const IvyIcon = (props: { icon: string; rotate?: 45 | 90 | 180 | 270 }) => (
  <i className={`ivy ivy-${props.icon} ivy-rotate-${props.rotate}`} />
);

export default IvyIcon;
