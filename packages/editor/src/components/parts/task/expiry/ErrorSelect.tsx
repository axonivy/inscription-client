import { EMPTY_SELECT_ITEM, useFieldset } from '../../../widgets';
import { Consumer } from '../../../../types/lambda';
import { PathFieldset } from '../../common/path/PathFieldset';
import ExceptionSelect from '../../common/exception-handler/ExceptionSelect';

const ErrorSelect = (props: { value: string; onChange: Consumer<string> }) => {
  const selectFieldset = useFieldset();
  return (
    <PathFieldset label='Error' {...selectFieldset.labelProps} path='error'>
      <ExceptionSelect {...props} inputProps={selectFieldset.inputProps} staticExceptions={[EMPTY_SELECT_ITEM.value]} />
    </PathFieldset>
  );
};

export default ErrorSelect;
