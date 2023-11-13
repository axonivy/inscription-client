import type { WfExpiry } from '@axonivy/inscription-protocol';
import { produce } from 'immer';
import type { DataUpdater } from '../../../../types/lambda';
import { useTaskDataContext } from '../../../../context';
import type { PriorityUpdater } from '../priority/PrioritySelect';
import type { ResponsibleUpdater } from '../../common/responsible/ResponsibleSelect';

export function useExpiryData(): {
  expiry: WfExpiry;
  update: DataUpdater<WfExpiry>;
  updateResponsible: ResponsibleUpdater;
  updatePriority: PriorityUpdater;
} {
  const { task, setTask } = useTaskDataContext();

  const update: DataUpdater<WfExpiry> = (field, value) => {
    setTask(
      produce(draft => {
        draft.expiry[field] = value;
      })
    );
  };

  const updateResponsible: ResponsibleUpdater = (field, value) => {
    setTask(
      produce(draft => {
        draft.expiry.responsible[field] = value;
      })
    );
  };

  const updatePriority: PriorityUpdater = (field, value) => {
    setTask(
      produce(draft => {
        draft.expiry.priority[field] = value;
      })
    );
  };

  return {
    expiry: task.expiry,
    update,
    updateResponsible,
    updatePriority
  };
}
