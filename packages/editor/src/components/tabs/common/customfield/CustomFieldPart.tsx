import { CustomField } from '@axonivy/inscription-protocol';
import { CollapsiblePart } from '../../../../components/widgets';
import CustomFieldTable from './CustomFieldTable';

const CustomFieldPart = (props: { customFields: CustomField[]; updateCustomFields: (customFields: CustomField[]) => void }) => {
  return (
    <CollapsiblePart collapsibleLabel='Custom Fields' defaultOpen={props.customFields.length > 0}>
      <CustomFieldTable data={props.customFields} onChange={props.updateCustomFields} />
    </CollapsiblePart>
  );
};

export default CustomFieldPart;
