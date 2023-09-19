import { ExceptionSelect, PathCollapsible, ValidationFieldset } from '../../common';
import { useQueryData } from '../useQueryData';
import { IVY_EXCEPTIONS } from '@axonivy/inscription-protocol';

export const DbExceptionHandler = () => {
  const { config, defaultConfig, updateException } = useQueryData();
  return (
    <PathCollapsible label='Error' defaultOpen={config.exceptionHandler !== defaultConfig.exceptionHandler} path='exceptionHandler'>
      <ValidationFieldset>
        <ExceptionSelect
          value={config.exceptionHandler}
          onChange={change => updateException(change)}
          staticExceptions={[IVY_EXCEPTIONS.database, IVY_EXCEPTIONS.ignoreException]}
        />
      </ValidationFieldset>
    </PathCollapsible>
  );
};
