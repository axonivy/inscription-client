import './ErrorFallback.js';
import { IvyIcons } from '@axonivy/editor-icons';
import type { FallbackProps } from 'react-error-boundary';
import { useDataContext } from '../../../context/index.js';
import IvyIcon from '../IvyIcon.js';

const ErrorFallback = (props: FallbackProps) => {
  const { data } = useDataContext();
  return (
    <div className='error-fallback' role='alert'>
      <div className='error-fallback-msg'>
        <h3>
          <IvyIcon icon={IvyIcons.Error} />
          Something went wrong:
        </h3>
        <pre>{props.error.message}</pre>
      </div>
      <div className='error-fallback-data'>
        <h5>
          <IvyIcon icon={IvyIcons.InfoCircle} />
          Data:
        </h5>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </div>
  );
};

export default ErrorFallback;
