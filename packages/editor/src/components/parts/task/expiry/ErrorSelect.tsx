import { EMPTY_SELECT_ITEM } from '../../../widgets';
import type { Consumer } from '../../../../types/lambda';
import { ExceptionSelect, PathFieldset } from '../../common';

const ErrorSelect = (props: { value: string; onChange: Consumer<string> }) => {
  return (
    <PathFieldset label='Error' path='error'>
      <ExceptionSelect {...props} staticExceptions={[EMPTY_SELECT_ITEM.value]} />
    </PathFieldset>
  );
};

export default ErrorSelect;
