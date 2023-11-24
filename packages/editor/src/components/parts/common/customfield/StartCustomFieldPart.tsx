import type { StartCustomStartField } from '@axonivy/inscription-protocol';
import { PathCollapsible } from '../path/PathCollapsible.js';
import StartCustomFieldTable from './StartCustomFieldTable.js';

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
