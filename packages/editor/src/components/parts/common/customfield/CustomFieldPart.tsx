import { CustomFieldConfigType, WfCustomField } from '@axonivy/inscription-protocol';
import { CollapsiblePart } from '../../../../components/widgets';
import CustomFieldTable from './CustomFieldTable';

type CustomFieldPartProps = {
  customFields: WfCustomField[];
  updateCustomFields: (customFields: WfCustomField[]) => void;
  type: CustomFieldConfigType;
};

const CustomFieldPart = ({ customFields, updateCustomFields, type }: CustomFieldPartProps) => {
  return (
    <CollapsiblePart collapsibleLabel='Custom Fields' defaultOpen={customFields.length > 0}>
      <CustomFieldTable data={customFields} onChange={updateCustomFields} type={type} />
    </CollapsiblePart>
  );
};

export default CustomFieldPart;
