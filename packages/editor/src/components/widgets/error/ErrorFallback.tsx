import './ErrorFallback.css';
import { IvyIcons } from '@axonivy/editor-icons';
import { FallbackProps } from 'react-error-boundary';
import { useDataContext } from '../../../context';
import IvyIcon from '../IvyIcon';

const ErrorFallback = (props: FallbackProps) => {
  const { data } = useDataContext();
  return (
    <div className='error-fallback' role='alert'>
      <p>
        <IvyIcon icon={IvyIcons.Error} />
        Something went wrong:
      </p>
      <pre>{props.error.message}</pre>
      <p>
        <IvyIcon icon={IvyIcons.Information} />
        Data:
      </p>
      <pre>{JSON.stringify(data)}</pre>
    </div>
  );
};

export default ErrorFallback;
