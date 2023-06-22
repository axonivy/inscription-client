import { WfExpiry } from '@axonivy/inscription-protocol';
import { produce } from 'immer';
import { Updater } from '../../../../types/lambda';
import { useTaskDataContext } from '../../../../context';
import { PriorityUpdater } from '../priority/PrioritySelect';
import { ResponsibleUpdater } from '../responsible/ResponsibleSelect';

export function useExpiryData(): {
  expiry: WfExpiry;
  updater: Updater<WfExpiry>;
  updateResponsible: ResponsibleUpdater;
  updatePriority: PriorityUpdater;
} {
  const { task, setTask } = useTaskDataContext();

  const updater: Updater<WfExpiry> = (field, value) => {
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
    updater,
    updateResponsible,
    updatePriority
  };
}
