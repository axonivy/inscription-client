import type { CustomFieldConfigType, WfCustomField } from '@axonivy/inscription-protocol';
import CustomFieldTable from './CustomFieldTable.js';
import { PathCollapsible } from '../path/PathCollapsible.js';

type CustomFieldPartProps = {
  customFields: WfCustomField[];
  updateCustomFields: (customFields: WfCustomField[]) => void;
  type: CustomFieldConfigType;
};

const CustomFieldPart = ({ customFields, updateCustomFields, type }: CustomFieldPartProps) => {
  return (
    <PathCollapsible label='Custom Fields' defaultOpen={customFields.length > 0} path='customFields'>
      <CustomFieldTable data={customFields} onChange={updateCustomFields} type={type} />
    </PathCollapsible>
  );
};

export default CustomFieldPart;
