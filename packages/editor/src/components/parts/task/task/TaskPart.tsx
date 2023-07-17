import ExpiryPart from '../expiry/ExpiryPart';
import PersistPart from '../options/PersistPart';
import TaskListPart from '../options/TaskListPart';
import PrioritySelect from '../priority/PrioritySelect';
import CustomFieldPart from '../../common/customfield/CustomFieldPart';
import { MacroArea, MacroInput, ScriptArea, useFieldset } from '../../../widgets';
import ResponsibleSelect from '../responsible/ResponsibleSelect';
import { useTaskData } from '../useTaskData';
import { PathContext } from '../../../../context';
import { PathFieldset } from '../../common/path/PathFieldset';
import { PathCollapsible } from '../../common/path/PathCollapsible';

const TaskPart = (props: { showPersist?: boolean }) => {
  const { task, update, updateResponsible, updatePriority } = useTaskData();
  const nameFieldset = useFieldset();
  const descFieldset = useFieldset();
  const catFieldset = useFieldset();

  return (
    <PathContext path='task'>
      <PathFieldset label='Name' {...nameFieldset.labelProps} path='name'>
        <MacroInput value={task.name} onChange={change => update('name', change)} {...nameFieldset.inputProps} />
      </PathFieldset>
      <PathFieldset label='Description' {...descFieldset.labelProps} path='description'>
        <MacroArea value={task.description} onChange={change => update('description', change)} {...descFieldset.inputProps} />
      </PathFieldset>
      <PathFieldset label='Category' {...catFieldset.labelProps} path='category'>
        <MacroInput value={task.category} onChange={change => update('category', change)} {...catFieldset.inputProps} />
      </PathFieldset>
      {!props.showPersist && (
        <ResponsibleSelect responsible={task.responsible} updateResponsible={updateResponsible} optionFilter={['DELETE_TASK']} />
      )}
      <PrioritySelect priority={task.priority} updatePriority={updatePriority} />
      {props.showPersist ? <PersistPart /> : <TaskListPart />}
      <ExpiryPart />
      <CustomFieldPart customFields={task.customFields} updateCustomFields={change => update('customFields', change)} type='TASK' />
      <PathCollapsible collapsibleLabel='Code' defaultOpen={task.code.length > 0} path='code'>
        <ScriptArea value={task.code} onChange={change => update('code', change)} />
      </PathCollapsible>
    </PathContext>
  );
};

export default TaskPart;
