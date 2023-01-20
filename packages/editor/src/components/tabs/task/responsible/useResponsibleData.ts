import { Responsible, ResponsibleType, Task } from '@axonivy/inscription-protocol';
import produce from 'immer';
import { useCallback } from 'react';
import { useTaskDataContext } from '../../../../context';

export function useResponsibleData(expiry?: boolean): {
  responsible: Responsible;
  updateType: (type: ResponsibleType) => void;
  updateActivator: (activator: string) => void;
} {
  const { task, setTask } = useTaskDataContext();

  const getResponsible = useCallback(() => {
    if (expiry) {
      return task.expiry?.responsible ?? {};
    } else {
      return task.responsible ?? {};
    }
  }, [task, expiry]);

  const responsible = getResponsible();

  const setResponsible = useCallback(
    (updateResponsible: (responsible: Responsible) => Responsible) => {
      setTask(
        produce((draft: Task) => {
          if (expiry !== undefined) {
            if (!draft.expiry) {
              draft.expiry = {};
            }
            draft.expiry.responsible = updateResponsible(getResponsible());
          } else {
            draft.responsible = updateResponsible(getResponsible());
          }
        })
      );
    },
    [getResponsible, setTask, expiry]
  );

  const updateType = useCallback(
    (type: ResponsibleType) => {
      setResponsible(
        produce((draft: Responsible) => {
          draft.type = type;
        })
      );
    },
    [setResponsible]
  );

  const updateActivator = useCallback(
    (activator: string) => {
      setResponsible(
        produce((draft: Responsible) => {
          draft.activator = activator;
        })
      );
    },
    [setResponsible]
  );

  return { responsible, updateType, updateActivator };
}
