import ExpiryPart from '../expiry/ExpiryPart';
import PersistPart from '../options/PersistPart';
import TaskListPart from '../options/TaskListPart';
import PrioritySelect from '../priority/PrioritySelect';
import CustomFieldPart from '../../common/customfield/CustomFieldPart';
import { CollapsiblePart, Fieldset, MacroArea, MacroInput, ScriptArea, useFieldset } from '../../../widgets';
import ResponsibleSelect from '../responsible/ResponsibleSelect';
import { useTaskData } from '../useTaskData';

const TaskPart = (props: { showPersist?: boolean }) => {
  const { task, update, updateResponsible, updatePriority } = useTaskData();
  const nameFieldset = useFieldset();
  const descFieldset = useFieldset();
  const catFieldset = useFieldset();

  return (
    <>
      <Fieldset label='Name' {...nameFieldset.labelProps}>
        <MacroInput value={task.name} onChange={change => update('name', change)} location='task.name' {...nameFieldset.inputProps} />
      </Fieldset>
      <Fieldset label='Description' {...descFieldset.labelProps}>
        <MacroArea
          value={task.description}
          onChange={change => update('description', change)}
          location='task.description'
          {...descFieldset.inputProps}
        />
      </Fieldset>
      <Fieldset label='Category' {...catFieldset.labelProps}>
        <MacroInput
          value={task.category}
          onChange={change => update('category', change)}
          location='task.category'
          {...catFieldset.inputProps}
        />
      </Fieldset>
      {!props.showPersist && (
        <ResponsibleSelect responsible={task.responsible} updateResponsible={updateResponsible} optionFilter={['DELETE_TASK']} />
      )}
      <PrioritySelect priority={task.priority} updatePriority={updatePriority} />
      {props.showPersist ? <PersistPart /> : <TaskListPart />}
      <ExpiryPart />
      <CustomFieldPart customFields={task.customFields} updateCustomFields={change => update('customFields', change)} />
      <CollapsiblePart collapsibleLabel='Code' defaultOpen={task.code.length > 0}>
        <ScriptArea value={task.code} onChange={change => update('code', change)} location='task.code' />
      </CollapsiblePart>
    </>
  );
};

export default TaskPart;
