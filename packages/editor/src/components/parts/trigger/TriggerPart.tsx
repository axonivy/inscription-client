import { Checkbox, Collapsible, ScriptInput, useFieldset } from '../../widgets';
import { PartProps, usePartDirty, usePartState } from '../../editors';
import { useTriggerData } from './useTriggerData';
import { IVY_SCRIPT_TYPES, TriggerData } from '@axonivy/inscription-protocol';
import { PathContext, useValidations } from '../../../context';
import ResponsibleSelect from '../common/responsible/ResponsibleSelect';
import { PathFieldset } from '../common';

export function useTriggerPart(): PartProps {
  const { config, defaultConfig, initConfig, resetData } = useTriggerData();
  const responsibleVal = useValidations(['task', 'responsible']);
  const delayVal = useValidations(['task', 'delay']);
  const compareData = (data: TriggerData) => [data.triggerable, data.case.attachToBusinessCase, data.task.responsible, data.task.delay];
  const state = usePartState(compareData(defaultConfig), compareData(config), [...responsibleVal, ...delayVal]);
  const dirty = usePartDirty(compareData(initConfig), compareData(config));
  return { name: 'Trigger', state: state, reset: { dirty, action: () => resetData() }, content: <TriggerPart /> };
}

const TriggerPart = () => {
  const { config, update, updateResponsible, updateDelay, updateAttach } = useTriggerData();

  const delayFieldset = useFieldset();
  return (
    <>
      <Checkbox
        value={config.triggerable}
        onChange={change => update('triggerable', change)}
        label='Yes, this can be started with a Trigger Activity'
      />
      {config.triggerable && (
        <PathContext path='task'>
          <ResponsibleSelect responsible={config.task.responsible} updateResponsible={updateResponsible} />
          <Collapsible label='Options' defaultOpen={config.case.attachToBusinessCase || config.task.delay.length > 0}>
            <Checkbox
              value={config.case.attachToBusinessCase}
              onChange={change => updateAttach(change)}
              label='Attach to Business Case that triggered this process'
            />
            <PathFieldset label='Delay' {...delayFieldset.labelProps} path='delay'>
              <ScriptInput
                value={config.task.delay}
                onChange={change => updateDelay(change)}
                type={IVY_SCRIPT_TYPES.DURATION}
                {...delayFieldset.inputProps}
              />
            </PathFieldset>
          </Collapsible>
        </PathContext>
      )}
    </>
  );
};
