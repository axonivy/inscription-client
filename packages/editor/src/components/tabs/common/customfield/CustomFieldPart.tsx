import { CollapsiblePart } from '../../../../components/widgets';
import { useData } from '../../../../context';
import CustomFieldTable from './CustomFieldTable';

const CustomFieldPart = () => {
  const [, customField, setCustomField] = useData('config/task/customFields');

  return (
    <CollapsiblePart collapsibleLabel='Custom Fields' defaultOpen={customField !== undefined}>
      <CustomFieldTable data={customField ?? []} onChange={setCustomField} />
    </CollapsiblePart>
  );
};

export default CustomFieldPart;
