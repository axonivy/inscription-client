import { StartCustomStartField } from '@axonivy/inscription-protocol';
import { PathCollapsible } from '../path/PathCollapsible';
import StartCustomFieldTable from './StartCustomFieldTable';

type StartCustomFieldPartProps = {
  customFields: StartCustomStartField[];
  updateCustomFields: (customFields: StartCustomStartField[]) => void;
};

const StartCustomFieldPart = ({ customFields, updateCustomFields }: StartCustomFieldPartProps) => {
  return (
    <PathCollapsible label='Custom Fields' defaultOpen={customFields.length > 0} path='customFields'>
      <StartCustomFieldTable data={customFields} onChange={updateCustomFields} />
    </PathCollapsible>
  );
};

export default StartCustomFieldPart;
