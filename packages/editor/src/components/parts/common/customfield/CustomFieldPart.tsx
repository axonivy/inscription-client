import { CustomFieldConfigType, WfCustomField } from '@axonivy/inscription-protocol';
import { Collapsible } from '../../../../components/widgets';
import CustomFieldTable from './CustomFieldTable';

type CustomFieldPartProps = {
  customFields: WfCustomField[];
  updateCustomFields: (customFields: WfCustomField[]) => void;
  type: CustomFieldConfigType;
};

const CustomFieldPart = ({ customFields, updateCustomFields, type }: CustomFieldPartProps) => {
  return (
    <Collapsible label='Custom Fields' defaultOpen={customFields.length > 0}>
      <CustomFieldTable data={customFields} onChange={updateCustomFields} type={type} />
    </Collapsible>
  );
};

export default CustomFieldPart;
