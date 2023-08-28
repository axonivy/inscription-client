import { Collapsible } from '../../../widgets';
import { ExceptionSelect, IGNROE_EXCEPTION } from '../../common';
import { useQueryData } from '../useQueryData';
import { IVY_EXCEPTIONS } from '@axonivy/inscription-protocol';

export const DbExceptionHandler = () => {
  const { config, defaultConfig, updateException } = useQueryData();
  return (
    <Collapsible label='Error' defaultOpen={config.exceptionHandler !== defaultConfig.exceptionHandler}>
      <ExceptionSelect
        value={config.exceptionHandler}
        onChange={change => updateException(change)}
        staticExceptions={[IVY_EXCEPTIONS.database, IGNROE_EXCEPTION]}
      />
    </Collapsible>
  );
};
