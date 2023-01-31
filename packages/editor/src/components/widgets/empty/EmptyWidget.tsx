import './EmptyWidget.css';
import { IvyIcons } from '@axonivy/editor-icons';
import IvyIcon from '../IvyIcon';

const EmptyWidget = (props: { message: string }) => {
  return (
    <div className='empty-widget' role='alert'>
      <p>
        <IvyIcon icon={IvyIcons.Information} />
        {props.message}
      </p>
    </div>
  );
};

export default EmptyWidget;
