import { EMPTY_SELECT_ITEM, useFieldset } from '../../../widgets/index.js';
import type { Consumer } from '../../../../types/lambda.js';
import { ExceptionSelect, PathFieldset } from '../../common/index.js';

const ErrorSelect = (props: { value: string; onChange: Consumer<string> }) => {
  const selectFieldset = useFieldset();
  return (
    <PathFieldset label='Error' {...selectFieldset.labelProps} path='error'>
      <ExceptionSelect {...props} inputProps={selectFieldset.inputProps} staticExceptions={[EMPTY_SELECT_ITEM.value]} />
    </PathFieldset>
  );
};

export default ErrorSelect;
