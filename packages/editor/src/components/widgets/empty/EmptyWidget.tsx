import './EmptyWidget.js';
import { IvyIcons } from '@axonivy/editor-icons';
import IvyIcon from '../IvyIcon.js';

const EmptyWidget = (props: { message: string }) => {
  return (
    <div className='empty-widget' role='alert'>
      <p>
        <IvyIcon icon={IvyIcons.InfoCircle} />
        {props.message}
      </p>
    </div>
  );
};

export default EmptyWidget;
