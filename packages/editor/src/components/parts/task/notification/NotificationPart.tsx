import { Checkbox } from '../../../widgets';
import { PathCollapsible } from '../../common';
import { useTaskData } from '../useTaskData';
import TemplateSelect from './TemplateSelect';
import { DEFAULT_TEMPLATE } from './useTemplates';

const NotificationPart = () => {
  const { task, updateNotification } = useTaskData();

  return (
    <PathCollapsible label='Notification' path='notification' defaultOpen={ task.notification.suppress || task.notification.template != DEFAULT_TEMPLATE }>
      <Checkbox
        label='Suppress'
        value={task.notification.suppress}
        onChange={change => updateNotification('suppress', change)}
      />
      <TemplateSelect 
        notification={task.notification}
        onChange={item => updateNotification('template', item.value)}        
      />  
    </PathCollapsible>
  );
};

export default NotificationPart;
